/* ============================================================
   Maestro Command Centre — AI Assistant
   Universal AI Bar, suggestion chips, briefing cards,
   Deep Agent panel with multi-step workflows
   ============================================================ */

const MaestroAI = (() => {
  // ---- SVG icons ----
  const SPARKLE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" fill="currentColor" stroke="none"/></svg>`;
  const SEND_SVG = `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
  const CLOSE_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
  const MINIMIZE_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M6 12h12"/></svg>`;

  // ---- State ----
  let isBarOpen = false;
  let isAgentOpen = false;
  let isAgentMinimized = false;
  let currentScreen = '';
  let agentThread = [];
  let agentWorkflowStep = 0;
  let agentContext = '';

  // ============================================================
  // Context Engine
  // ============================================================
  function detectScreen() {
    const path = window.location.pathname;
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('inbox-compact')) return 'inbox-compact';
    if (path.includes('inbox-cards')) return 'inbox-cards';
    if (path.includes('inbox-queue')) return 'inbox-queue';
    if (path.includes('client-detail')) return 'client-detail';
    if (path.includes('clients')) return 'clients';
    if (path.includes('trip-detail')) return 'trip-detail';
    if (path.includes('trip-pipeline')) return 'trip-pipeline';
    if (path.includes('tasks')) return 'tasks';
    if (path.includes('alerts')) return 'alerts';
    if (path.includes('onboarding')) return 'onboarding';
    if (path.includes('settings')) return 'settings';
    return 'unknown';
  }

  function getContext() {
    const ctx = { screen: currentScreen };

    // URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('id')) ctx.entityId = params.get('id');
    if (params.get('conv')) ctx.convId = params.get('conv');

    // Globals from screen JS
    if (typeof currentConvId !== 'undefined' && currentConvId) {
      ctx.convId = currentConvId;
      const conv = CONVERSATIONS.find(c => c.id === currentConvId);
      if (conv) {
        ctx.conversation = conv;
        ctx.householdId = conv.householdId;
        const h = getHousehold(conv.householdId);
        if (h) ctx.householdName = h.name;
        if (conv.tripId) {
          ctx.tripId = conv.tripId;
          const trip = getTrip(conv.tripId);
          if (trip) ctx.tripName = trip.name;
        }
      }
    }

    // Trip detail page
    if (ctx.screen === 'trip-detail' && ctx.entityId) {
      const trip = getTrip(ctx.entityId);
      if (trip) {
        ctx.tripId = trip.id;
        ctx.tripName = trip.name;
        ctx.householdId = trip.householdId;
      }
    }

    // Client detail page
    if (ctx.screen === 'client-detail' && ctx.entityId) {
      const client = getClient(ctx.entityId);
      if (client) {
        ctx.clientId = client.id;
        ctx.clientName = client.name;
        ctx.householdId = client.householdId;
      }
    }

    return ctx;
  }

  // ============================================================
  // Placeholder text per screen
  // ============================================================
  function getPlaceholder(ctx) {
    switch (ctx.screen) {
      case 'dashboard':
        return 'Ask about your workload, team stats, or priorities...';
      case 'inbox-compact':
      case 'inbox-cards':
      case 'inbox-queue':
        if (ctx.tripName) return `Ask about ${ctx.tripName}...`;
        if (ctx.householdName) return `Ask about ${ctx.householdName}...`;
        return 'Ask about this conversation, draft a reply, or research...';
      case 'client-detail':
        return ctx.clientName ? `Ask about ${ctx.clientName}...` : 'Ask about this client...';
      case 'trip-detail':
        return ctx.tripName ? `Ask about ${ctx.tripName}...` : 'Ask about this trip...';
      case 'trip-pipeline':
        return 'Ask about trips, pipeline status, or at-risk bookings...';
      case 'tasks':
        return 'Ask about tasks, deadlines, or what to work on next...';
      case 'alerts':
        return 'Ask about flight alerts, availability, or points programs...';
      case 'onboarding':
        return 'Ask about this client profile or verify extracted data...';
      case 'settings':
        return 'Ask about settings, team config, or SLA rules...';
      default:
        return 'Ask Maestro AI...';
    }
  }

  // ============================================================
  // Suggestions per screen
  // ============================================================
  function getSuggestions(ctx) {
    const base = [];
    switch (ctx.screen) {
      case 'dashboard':
        base.push(
          { label: 'End-of-day summary', action: 'eod-summary' },
          { label: 'What should I prioritize?', action: 'prioritize' },
          { label: 'Show SLA risks', action: 'sla-risks' },
          { label: 'Unassigned conversations', action: 'unassigned' }
        );
        break;
      case 'inbox-compact':
      case 'inbox-cards':
      case 'inbox-queue':
        if (ctx.conversation) {
          base.push({ label: 'Draft a reply', action: 'draft-reply' });
          base.push({ label: 'Summarize thread', action: 'summarize' });
          if (ctx.conversation.threadType === 'trip') {
            base.push({ label: 'Check trip status', action: 'trip-status' });
            base.push({ label: 'Research venues', action: 'research-venues' });
          } else {
            base.push({ label: 'Look up loyalty points', action: 'loyalty-points' });
          }
          if (!ctx.conversation.assignedTo) {
            base.unshift({ label: 'Suggest assignment', action: 'suggest-assign' });
          }
        } else {
          base.push(
            { label: 'Show SLA breaches', action: 'sla-breaches' },
            { label: 'Summarize unread', action: 'summarize-unread' }
          );
        }
        break;
      case 'client-detail':
        base.push(
          { label: 'Find loyalty redemptions', action: 'loyalty-redeem' },
          { label: 'Summarize recent activity', action: 'client-summary' },
          { label: 'Draft outreach message', action: 'draft-outreach' }
        );
        break;
      case 'trip-detail':
        base.push(
          { label: 'Compare hotel options', action: 'compare-hotels' },
          { label: 'Check budget impact', action: 'budget-check' },
          { label: 'Draft client update', action: 'draft-update' },
          { label: 'Research activities', action: 'research-activities' }
        );
        break;
      case 'trip-pipeline':
        base.push(
          { label: 'Show at-risk trips', action: 'at-risk' },
          { label: 'Pipeline summary', action: 'pipeline-summary' },
          { label: 'Trips needing attention', action: 'needs-attention' }
        );
        break;
      case 'tasks':
        base.push(
          { label: 'What should I work on first?', action: 'prioritize-tasks' },
          { label: 'Show blocked tasks', action: 'blocked-tasks' },
          { label: 'End-of-day summary', action: 'eod-tasks' },
          { label: 'Show overdue tasks', action: 'overdue-tasks' }
        );
        break;
      case 'alerts':
        base.push(
          { label: 'Check current availability', action: 'check-avail' },
          { label: 'Compare programs', action: 'compare-programs' },
          { label: 'Notify client of alert', action: 'notify-alert' }
        );
        break;
      default:
        base.push(
          { label: 'What should I work on?', action: 'prioritize' },
          { label: 'Show my tasks', action: 'my-tasks' }
        );
    }
    return base;
  }

  // ============================================================
  // AI Bar Rendering
  // ============================================================
  function renderAIBar() {
    // Skip if already rendered
    if (document.getElementById('maestro-ai-bar')) return;

    const ctx = getContext();
    const placeholder = getPlaceholder(ctx);
    const suggestions = getSuggestions(ctx);

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'ai-bar-backdrop';
    backdrop.className = 'ai-bar-backdrop';
    backdrop.addEventListener('click', closeBar);
    document.body.appendChild(backdrop);

    // Bar container
    const bar = document.createElement('div');
    bar.id = 'maestro-ai-bar';
    bar.className = 'ai-bar';

    // Pill (collapsed state)
    const pill = document.createElement('div');
    pill.className = 'ai-bar-pill';
    pill.innerHTML = `
      <span class="ai-sparkle">${SPARKLE_SVG}</span>
      <span class="ai-pill-label">Ask Maestro AI...</span>
      <kbd>${navigator.platform.includes('Mac') ? '\u2318' : 'Ctrl'}+J</kbd>
    `;
    pill.addEventListener('click', openBar);

    // Expanded state
    const expanded = document.createElement('div');
    expanded.className = 'ai-bar-expanded';

    const inputRow = document.createElement('div');
    inputRow.className = 'ai-bar-input-row';
    inputRow.innerHTML = `
      <span class="ai-sparkle">${SPARKLE_SVG}</span>
      <input type="text" class="ai-bar-input" placeholder="${placeholder}" id="ai-bar-input" autocomplete="off">
      <button class="ai-bar-send" title="Send">${SEND_SVG}</button>
    `;

    const suggestionsEl = document.createElement('div');
    suggestionsEl.className = 'ai-bar-suggestions';
    suggestions.forEach(s => {
      const item = document.createElement('div');
      item.className = 'ai-bar-suggestion';
      item.innerHTML = `<span class="ai-sparkle">${SPARKLE_SVG}</span><span>${s.label}</span>`;
      item.addEventListener('click', () => handleSuggestion(s));
      suggestionsEl.appendChild(item);
    });

    expanded.appendChild(inputRow);
    expanded.appendChild(suggestionsEl);
    bar.appendChild(pill);
    bar.appendChild(expanded);
    document.body.appendChild(bar);

    // Input events
    const input = expanded.querySelector('#ai-bar-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        handleFreeText(input.value.trim());
        input.value = '';
      }
      if (e.key === 'Escape') closeBar();
    });

    const sendBtn = expanded.querySelector('.ai-bar-send');
    sendBtn.addEventListener('click', () => {
      if (input.value.trim()) {
        handleFreeText(input.value.trim());
        input.value = '';
      }
    });
  }

  function openBar() {
    const bar = document.getElementById('maestro-ai-bar');
    const backdrop = document.getElementById('ai-bar-backdrop');
    if (!bar) return;
    bar.classList.add('open');
    isBarOpen = true;
    if (backdrop) backdrop.classList.add('open');
    setTimeout(() => {
      const input = document.getElementById('ai-bar-input');
      if (input) input.focus();
    }, 100);
  }

  function closeBar() {
    const bar = document.getElementById('maestro-ai-bar');
    const backdrop = document.getElementById('ai-bar-backdrop');
    if (!bar) return;
    bar.classList.remove('open');
    isBarOpen = false;
    if (backdrop) backdrop.classList.remove('open');
  }

  function toggleBar() {
    if (isBarOpen) closeBar(); else openBar();
  }

  // ============================================================
  // Suggestion Handlers
  // ============================================================
  function handleSuggestion(suggestion) {
    closeBar();
    const ctx = getContext();

    switch (suggestion.action) {
      case 'draft-reply':
        executeDraftReply(ctx);
        break;
      case 'research-venues':
      case 'research-activities':
      case 'compare-hotels':
        openAgentPanel(suggestion.action, ctx);
        break;
      case 'summarize':
        executeQuickAssist('Thread Summary', 'Summarizing conversation thread...', generateThreadSummary(ctx));
        break;
      case 'prioritize-tasks':
      case 'prioritize':
        executeQuickAssist('Priority Analysis', 'Analyzing your workload...', generatePrioritySummary());
        break;
      case 'blocked-tasks':
        executeQuickAssist('Blocked Tasks', 'Finding blocked tasks...', generateBlockedSummary());
        break;
      case 'overdue-tasks':
        executeQuickAssist('Overdue Tasks', 'Checking overdue tasks...', generateOverdueSummary());
        break;
      case 'eod-summary':
      case 'eod-tasks':
        executeQuickAssist('End of Day Summary', 'Generating end-of-day summary...', generateEODSummary());
        break;
      case 'sla-risks':
      case 'sla-breaches':
        executeQuickAssist('SLA Status', 'Checking SLA status...', generateSLASummary());
        break;
      default:
        const actionTitle = getActionTitle(suggestion.action);
        showInlineResult(actionTitle, 'Processing...', { loading: true });
        setTimeout(() => showInlineResult(actionTitle, getQuickResponse(suggestion.action)), 1200);
    }
  }

  function handleFreeText(text) {
    closeBar();
    const ctx = getContext();
    // For free text, open the Deep Agent panel
    openAgentPanel('freetext', ctx, text);
  }

  // ============================================================
  // Inline AI Result Card (replaces toasts for AI responses)
  // ============================================================
  let inlineResultTimer = null;

  function showInlineResult(title, content, opts = {}) {
    // Remove any existing result card
    dismissInlineResult(true);

    const card = document.createElement('div');
    card.className = 'ai-inline-result' + (opts.loading ? ' loading' : '');
    card.id = 'ai-inline-result';

    card.innerHTML = `
      <div class="ai-inline-result-header">
        <span class="ai-sparkle">${SPARKLE_SVG}</span>
        <span class="ai-inline-result-title">${title}</span>
        <button class="ai-inline-result-dismiss" title="Dismiss">&times;</button>
      </div>
      <div class="ai-inline-result-body">${content}</div>
      ${!opts.loading ? '<div class="ai-inline-result-timer"><div class="ai-inline-result-timer-fill"></div></div>' : ''}
    `;

    card.querySelector('.ai-inline-result-dismiss').addEventListener('click', () => dismissInlineResult());

    document.body.appendChild(card);

    // Auto-dismiss after 12s (unless loading)
    if (!opts.loading) {
      const fill = card.querySelector('.ai-inline-result-timer-fill');
      if (fill) {
        requestAnimationFrame(() => {
          fill.style.transitionDuration = '12s';
          fill.style.width = '0%';
        });
      }
      inlineResultTimer = setTimeout(() => dismissInlineResult(), 12000);
    }
  }

  function dismissInlineResult(immediate) {
    if (inlineResultTimer) { clearTimeout(inlineResultTimer); inlineResultTimer = null; }
    const existing = document.getElementById('ai-inline-result');
    if (!existing) return;
    if (immediate) { existing.remove(); return; }
    existing.classList.add('dismissing');
    setTimeout(() => existing.remove(), 200);
  }

  // ============================================================
  // Quick Assist (inline result cards)
  // ============================================================
  function executeQuickAssist(title, loadingMsg, resultMsg) {
    showInlineResult(title, loadingMsg, { loading: true });
    setTimeout(() => {
      showInlineResult(title, resultMsg);
    }, 1500);
  }

  function executeDraftReply(ctx) {
    // Find the composer textarea on inbox screens
    const textarea = document.getElementById('composer-input');
    if (textarea && typeof simulateAIDraft === 'function') {
      const draftText = getDraftForContext(ctx);
      simulateAIDraft('composer-input', draftText);
      // Highlight composer instead of toast
      textarea.classList.add('ai-composer-highlighted');
      setTimeout(() => textarea.classList.remove('ai-composer-highlighted'), 1600);
    } else {
      showInlineResult('Draft Reply', 'Draft reply generated -- switch to a conversation to see it.');
    }
  }

  function getDraftForContext(ctx) {
    if (ctx.convId && AI_DRAFT_RESPONSES[ctx.convId]) {
      return AI_DRAFT_RESPONSES[ctx.convId];
    }
    return "Thank you for reaching out! I've looked into your request and have some great options to share. Let me know if you'd like me to go into more detail on any of these.";
  }

  // ============================================================
  // Quick Response Generators
  // ============================================================
  function generateThreadSummary(ctx) {
    if (!ctx.conversation) return 'No conversation selected.';
    const h = getHousehold(ctx.conversation.householdId);
    const trip = ctx.tripId ? getTrip(ctx.tripId) : null;
    return `${h ? h.name : 'Client'}: ${trip ? trip.name + ' -- ' : ''}${ctx.conversation.lastMessage || 'No recent messages'}. SLA: ${ctx.conversation.slaStatus}.`;
  }

  function generatePrioritySummary() {
    const urgent = TASKS.filter(t => t.priority === 'Urgent');
    const blocked = TASKS.filter(t => t.status === 'Blocked');
    const overdue = TASKS.filter(t => t.dueIn && t.dueIn.includes('overdue'));
    return `Focus on: ${urgent.length} urgent, ${blocked.length} blocked, ${overdue.length} overdue tasks. Top priority: ${urgent[0] ? urgent[0].title.substring(0, 60) + '...' : blocked[0] ? blocked[0].title.substring(0, 60) + '...' : 'All clear!'}`;
  }

  function generateBlockedSummary() {
    const blocked = TASKS.filter(t => t.status === 'Blocked');
    return `${blocked.length} blocked tasks: ${blocked.map(t => t.title.substring(0, 40)).join('; ')}`;
  }

  function generateOverdueSummary() {
    const overdue = TASKS.filter(t => t.dueIn && t.dueIn.includes('overdue'));
    return overdue.length > 0
      ? `${overdue.length} overdue: ${overdue.map(t => t.title.substring(0, 40) + ' (' + t.dueIn + ')').join('; ')}`
      : 'No overdue tasks. All on track!';
  }

  function generateEODSummary() {
    const stats = getDashboardStats();
    return `Today: ${stats.openConversations} open conversations, ${stats.urgentTasks} urgent tasks, ${stats.slaBreaches} SLA breaches, ${stats.unassigned || 0} unassigned. ${stats.slaBreaches > 0 ? 'Address SLA breaches first.' : 'Looking good!'}`;
  }

  function generateSLASummary() {
    const breached = CONVERSATIONS.filter(c => c.slaStatus === 'breached');
    const critical = CONVERSATIONS.filter(c => c.slaStatus === 'critical');
    return `SLA Status: ${breached.length} breached, ${critical.length} critical. ${breached.length > 0 ? 'Breached: ' + breached.map(c => { const h = getHousehold(c.householdId); return h ? h.name : c.id; }).join(', ') : 'No breaches.'}`;
  }

  function getActionTitle(action) {
    const titles = {
      'trip-status': 'Trip Status',
      'loyalty-points': 'Loyalty Points',
      'suggest-assign': 'Assignment Suggestion',
      'client-summary': 'Client Summary',
      'loyalty-redeem': 'Redemption Options',
      'draft-outreach': 'Draft Outreach',
      'budget-check': 'Budget Check',
      'draft-update': 'Client Update',
      'at-risk': 'At-Risk Trips',
      'pipeline-summary': 'Pipeline Summary',
      'needs-attention': 'Needs Attention',
      'check-avail': 'Availability Check',
      'compare-programs': 'Program Comparison',
      'notify-alert': 'Alert Notification',
      'summarize-unread': 'Unread Summary',
      'unassigned': 'Unassigned Items',
    };
    return titles[action] || 'AI Result';
  }

  function getQuickResponse(action) {
    const responses = {
      'trip-status': 'Trip is on track. 3 components confirmed, 2 pending client approval.',
      'loyalty-points': 'Amex MR: 320K, Chase UR: 185K. Best redemption: Delta One SFO-ATH at 90K pts.',
      'suggest-assign': 'Suggested: Angua von Uberwald -- has capacity and handles this household.',
      'client-summary': 'Last interaction 2 days ago. 1 active trip, 3 open tasks. VIP tier.',
      'loyalty-redeem': 'Best options: Delta One to Athens (90K Amex), Four Seasons Bali (60K Marriott).',
      'draft-outreach': 'Draft created: "Hi [name], just checking in on your upcoming trip..."',
      'budget-check': 'Current total: $18,400. Within budget ($15K-25K range). 3 components TBD.',
      'draft-update': 'Draft client update generated with latest booking confirmations.',
      'at-risk': '2 trips at risk: Vetinari Maldives (blocked flights), Ogg Panama (missing passports).',
      'pipeline-summary': '3 in Planning, 2 in Booking, 1 Confirmed, 1 Active Travel. 2 need attention.',
      'needs-attention': '2 trips need attention: Ridcully France (anniversary dinner TBD), Selachii Bali (villa negotiation).',
      'check-avail': 'Checked 5 active alerts. 1 triggered: SFO-MLE Business via KrisFlyer, 85K pts available.',
      'compare-programs': 'For SFO-ATH: Delta 90K pts vs United 88K pts. Delta has better availability May 8-12.',
      'notify-alert': 'Alert notification drafted for client review.',
      'summarize-unread': '4 unread conversations. Highest priority: Ogg family (SLA critical, 8m remaining).',
      'unassigned': getUnassignedConversations().length + ' unassigned conversations need to be picked up.',
    };
    return responses[action] || 'AI processed your request successfully.';
  }

  // ============================================================
  // Briefing Cards
  // ============================================================
  function renderBriefingCard(container, briefing) {
    if (!container || !briefing) return;

    // Check if dismissed
    const dismissKey = 'ai-briefing-' + (briefing.entityId || briefing.id || 'default');
    if (sessionStorage.getItem(dismissKey)) return;

    const card = document.createElement('div');
    card.className = 'ai-briefing ai-fade-in';
    card.id = dismissKey;

    const isLong = briefing.text.length > 200;

    card.innerHTML = `
      <div class="ai-briefing-header">
        <span class="ai-sparkle">${SPARKLE_SVG}</span>
        <span class="ai-briefing-label">AI Briefing</span>
        <button class="ai-briefing-dismiss" title="Dismiss">&times;</button>
      </div>
      <div class="ai-briefing-body ${isLong ? 'collapsed' : ''}">${briefing.text}</div>
      ${isLong ? '<button class="ai-briefing-toggle">Show more</button>' : ''}
      ${briefing.chips ? '<div class="ai-chips" style="margin-top:10px">' + briefing.chips.map(c =>
        `<span class="ai-chip" data-action="${c.action}"><span class="ai-sparkle">${SPARKLE_SVG}</span>${c.label}</span>`
      ).join('') + '</div>' : ''}
    `;

    // Dismiss handler
    card.querySelector('.ai-briefing-dismiss').addEventListener('click', () => {
      sessionStorage.setItem(dismissKey, '1');
      card.style.opacity = '0';
      setTimeout(() => card.remove(), 200);
    });

    // Toggle handler
    const toggle = card.querySelector('.ai-briefing-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const body = card.querySelector('.ai-briefing-body');
        body.classList.toggle('collapsed');
        toggle.textContent = body.classList.contains('collapsed') ? 'Show more' : 'Show less';
      });
    }

    // Chip handlers
    card.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const action = chip.dataset.action;
        chip.classList.add('loading');
        setTimeout(() => {
          chip.classList.remove('loading');
          chip.classList.add('done');
          handleSuggestion({ action, label: chip.textContent });
          setTimeout(() => chip.classList.remove('done'), 2000);
        }, 800);
      });
    });

    container.prepend(card);
  }

  // ============================================================
  // Suggestion Chips (standalone)
  // ============================================================
  function renderChips(container, chips) {
    if (!container || !chips || !chips.length) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'ai-chips ai-fade-in';

    chips.forEach(c => {
      const chip = document.createElement('span');
      chip.className = 'ai-chip';
      chip.dataset.action = c.action;
      chip.innerHTML = `<span class="ai-sparkle">${SPARKLE_SVG}</span>${c.label}`;
      chip.addEventListener('click', () => {
        chip.classList.add('loading');
        setTimeout(() => {
          chip.classList.remove('loading');
          chip.classList.add('done');
          handleSuggestion(c);
          setTimeout(() => chip.classList.remove('done'), 2000);
        }, 800);
      });
      wrapper.appendChild(chip);
    });

    container.appendChild(wrapper);
  }

  // ============================================================
  // Deep Agent Panel
  // ============================================================
  function openAgentPanel(workflowId, ctx, initialText) {
    isAgentMinimized = false;
    agentThread = [];
    agentWorkflowStep = 0;
    agentContext = workflowId;

    // Hide minimized tab
    const minTab = document.getElementById('ai-agent-minimized');
    if (minTab) minTab.classList.remove('visible');

    // Create or reuse panel
    let panel = document.getElementById('ai-agent-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'ai-agent-panel';
      panel.className = 'ai-agent-panel';
      panel.innerHTML = `
        <div class="ai-agent-header">
          <span class="ai-sparkle">${SPARKLE_SVG}</span>
          <span class="ai-agent-title">Maestro AI</span>
          <span class="ai-agent-context" id="ai-agent-context-label"></span>
          <div class="ai-agent-actions">
            <button class="ai-agent-btn" title="Minimize" onclick="MaestroAI.minimizeAgent()">${MINIMIZE_SVG}</button>
            <button class="ai-agent-btn" title="Close" onclick="MaestroAI.closeAgentPanel()">${CLOSE_SVG}</button>
          </div>
        </div>
        <div class="ai-agent-body-split">
          <div style="display:flex;flex-direction:column;flex:1;min-width:0;">
            <div class="ai-agent-thread" id="ai-agent-thread"></div>
            <div class="ai-agent-input-area">
              <input type="text" class="ai-agent-input" id="ai-agent-input" placeholder="Ask a follow-up..." autocomplete="off">
              <button class="ai-bar-send" onclick="MaestroAI.sendAgentMessage()" style="width:32px;height:32px">${SEND_SVG}</button>
            </div>
          </div>
          <div class="ai-task-tracker" id="ai-task-tracker" style="display:none;"></div>
        </div>
      `;
      document.body.appendChild(panel);

      // Create minimized tab
      const minimized = document.createElement('div');
      minimized.id = 'ai-agent-minimized';
      minimized.className = 'ai-agent-minimized';
      minimized.innerHTML = `<span class="ai-sparkle" style="writing-mode:horizontal-tb">${SPARKLE_SVG}</span> AI`;
      minimized.addEventListener('click', () => restoreAgent());
      document.body.appendChild(minimized);

      // Input enter key
      const input = panel.querySelector('#ai-agent-input');
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          sendAgentMessage();
        }
      });
    }

    // Set context label
    const contextLabel = panel.querySelector('#ai-agent-context-label');
    if (ctx.tripName) contextLabel.textContent = '-- ' + ctx.tripName;
    else if (ctx.householdName) contextLabel.textContent = '-- ' + ctx.householdName;
    else contextLabel.textContent = '';

    // Clear thread
    const thread = panel.querySelector('#ai-agent-thread');
    thread.innerHTML = '';

    // Open panel (double rAF to ensure DOM layout)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.classList.add('open');
      });
    });
    isAgentOpen = true;

    // Start workflow
    if (initialText) {
      addUserMessage(initialText);
      setTimeout(() => startAgentThinking(() => addAgentFreeResponse(initialText, ctx)), 800);
    } else {
      setTimeout(() => startWorkflow(workflowId, ctx), 300);
    }
  }

  function closeAgentPanel() {
    const panel = document.getElementById('ai-agent-panel');
    if (panel) panel.classList.remove('open');
    isAgentOpen = false;
    isAgentMinimized = false;
    const minTab = document.getElementById('ai-agent-minimized');
    if (minTab) minTab.classList.remove('visible');
  }

  function minimizeAgent() {
    const panel = document.getElementById('ai-agent-panel');
    if (panel) panel.classList.remove('open');
    isAgentOpen = false;
    isAgentMinimized = true;
    const minTab = document.getElementById('ai-agent-minimized');
    if (minTab) minTab.classList.add('visible');
  }

  function restoreAgent() {
    const panel = document.getElementById('ai-agent-panel');
    if (panel) panel.classList.add('open');
    isAgentOpen = true;
    isAgentMinimized = false;
    const minTab = document.getElementById('ai-agent-minimized');
    if (minTab) minTab.classList.remove('visible');
  }

  function addAgentMessage(html) {
    const thread = document.getElementById('ai-agent-thread');
    if (!thread) return;
    const msg = document.createElement('div');
    msg.className = 'ai-agent-msg ai-fade-in';
    msg.innerHTML = `
      <div class="ai-agent-msg-avatar"><span class="ai-sparkle">${SPARKLE_SVG}</span></div>
      <div class="ai-agent-msg-body">${html}</div>
    `;
    thread.appendChild(msg);
    thread.scrollTop = thread.scrollHeight;
    return msg;
  }

  function addUserMessage(text) {
    const thread = document.getElementById('ai-agent-thread');
    if (!thread) return;
    const msg = document.createElement('div');
    msg.className = 'ai-agent-user-msg ai-fade-in';
    msg.innerHTML = `<div class="ai-agent-user-bubble">${text}</div>`;
    thread.appendChild(msg);
    thread.scrollTop = thread.scrollHeight;
  }

  function startAgentThinking(callback) {
    const thread = document.getElementById('ai-agent-thread');
    if (!thread) return;
    const thinking = document.createElement('div');
    thinking.className = 'ai-agent-thinking ai-fade-in';
    thinking.innerHTML = `
      <div class="ai-agent-msg-avatar"><span class="ai-sparkle">${SPARKLE_SVG}</span></div>
      <div class="ai-thinking-dots"><span></span><span></span><span></span></div>
      <span class="ai-thinking-text">Thinking...</span>
    `;
    thread.appendChild(thinking);
    thread.scrollTop = thread.scrollHeight;
    setTimeout(() => {
      thinking.remove();
      if (callback) callback();
    }, 1500);
  }

  function sendAgentMessage() {
    const input = document.getElementById('ai-agent-input');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    input.value = '';
    addUserMessage(text);
    const ctx = getContext();
    setTimeout(() => startAgentThinking(() => addAgentFreeResponse(text, ctx)), 500);
  }

  // ============================================================
  // Workflow Engine
  // ============================================================
  function startWorkflow(workflowId, ctx) {
    const workflow = AI_WORKFLOWS[workflowId];
    if (!workflow) {
      // Fallback: generic response
      addAgentMessage("I can help with that! What specifically would you like me to look into?");
      return;
    }

    agentWorkflowStep = 0;

    // Render task tracker if workflow has tasks
    if (workflow.tasks) {
      // Reset task statuses
      workflow.tasks.forEach(t => { if (t.type === 'ai') t.status = 'queued'; });
      renderTaskTracker(workflow);
      // Start progressive task completion
      progressTasks(workflowId);
    }

    executeWorkflowStep(workflow, ctx);
  }

  function executeWorkflowStep(workflow, ctx) {
    if (agentWorkflowStep >= workflow.steps.length) return;

    const step = workflow.steps[agentWorkflowStep];

    if (step.type === 'message') {
      addAgentMessage(step.text);
      agentWorkflowStep++;
      if (agentWorkflowStep < workflow.steps.length) {
        setTimeout(() => executeWorkflowStep(workflow, ctx), 400);
      }
    }
    else if (step.type === 'question') {
      const msg = addAgentMessage(step.text);
      const body = msg.querySelector('.ai-agent-msg-body');

      // Add chip selectors
      const chipsDiv = document.createElement('div');
      chipsDiv.className = 'ai-agent-chips';
      step.options.forEach(opt => {
        const chip = document.createElement('span');
        chip.className = 'ai-agent-chip';
        chip.textContent = opt;
        chip.addEventListener('click', () => {
          // Select this chip
          chipsDiv.querySelectorAll('.ai-agent-chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');

          // Show as user message
          setTimeout(() => {
            addUserMessage(opt);
            agentWorkflowStep++;
            if (agentWorkflowStep < workflow.steps.length) {
              setTimeout(() => startAgentThinking(() => executeWorkflowStep(workflow, ctx)), 500);
            }
          }, 300);
        });
        chipsDiv.appendChild(chip);
      });
      body.appendChild(chipsDiv);
    }
    else if (step.type === 'results') {
      let html = step.intro ? `<p style="margin-bottom:12px">${step.intro}</p>` : '';
      addAgentMessage(html);

      // Add result cards after a brief delay
      const thread = document.getElementById('ai-agent-thread');
      step.cards.forEach((card, i) => {
        setTimeout(() => {
          const cardEl = document.createElement('div');
          cardEl.className = 'ai-result-card ai-fade-in';
          cardEl.style.marginLeft = '38px';
          cardEl.style.marginBottom = '8px';
          cardEl.innerHTML = `
            <div class="ai-result-card-header">
              <span class="ai-result-card-name">${card.name}</span>
              <span class="ai-result-card-price">${card.price}</span>
            </div>
            <div class="ai-result-card-desc">${card.description}</div>
            <div class="ai-result-card-meta">
              <span class="ai-result-card-rating">${card.rating}</span>
              <span class="ai-result-card-status">${card.status}</span>
            </div>
            <div class="ai-result-card-actions">
              <button onclick="MaestroAI.addToTrip('${card.name}')">+ Add to Trip</button>
            </div>
          `;
          thread.appendChild(cardEl);
          thread.scrollTop = thread.scrollHeight;
        }, i * 300);
      });

      agentWorkflowStep++;
      // Add follow-up message after cards
      if (agentWorkflowStep < workflow.steps.length) {
        setTimeout(() => executeWorkflowStep(workflow, ctx), step.cards.length * 300 + 500);
      }
    }
    else if (step.type === 'followup') {
      addAgentMessage(step.text);
      agentWorkflowStep++;
    }
  }

  function addAgentFreeResponse(text, ctx) {
    const lower = text.toLowerCase();
    let response = '';

    if (lower.includes('task') || lower.includes('work on') || lower.includes('priorit')) {
      response = generatePrioritySummary();
    } else if (lower.includes('blocked')) {
      response = generateBlockedSummary();
    } else if (lower.includes('overdue')) {
      response = generateOverdueSummary();
    } else if (lower.includes('sla') || lower.includes('breach')) {
      response = generateSLASummary();
    } else if (lower.includes('summary') || lower.includes('end of day') || lower.includes('eod')) {
      response = generateEODSummary();
    } else if (lower.includes('hotel') || lower.includes('venue') || lower.includes('restaurant')) {
      response = "I can help research that! Let me pull up some options based on the trip details and client preferences. What type of venue are you looking for?";
    } else if (lower.includes('flight') || lower.includes('availability')) {
      response = "Let me check current award availability. I'll cross-reference the client's loyalty programs with the best redemption rates.";
    } else if (lower.includes('draft') || lower.includes('reply') || lower.includes('message')) {
      response = "I've prepared a draft based on the conversation context. You can find it in the composer. Let me know if you'd like me to adjust the tone or add specific details.";
    } else if (lower.includes('budget')) {
      response = ctx.tripName
        ? `For ${ctx.tripName}: Current spend is tracking within the budget range. 3 confirmed components at $12,400, with 2 pending quotes expected by end of week.`
        : "I'd need a specific trip to check budget details. Which trip are you looking at?";
    } else {
      response = `I understand you're asking about "${text.substring(0, 50)}". Let me look into that. Is there a specific trip, client, or task this relates to?`;
    }

    addAgentMessage(response);
  }

  function addToTrip(name) {
    showToast(`"${name}" added to trip components`, 'success');
    // Update tracker card state if visible
    const cards = document.querySelectorAll('.ai-result-card-name');
    cards.forEach(n => {
      if (n.textContent === name) {
        const card = n.closest('.ai-result-card');
        const btn = card?.querySelector('.ai-result-card-actions button');
        if (btn) { btn.innerHTML = '&#10003; Added'; btn.style.color = 'var(--success)'; btn.disabled = true; }
      }
    });
  }

  // ============================================================
  // Task Tracker
  // ============================================================
  function renderTaskTracker(workflow) {
    const tracker = document.getElementById('ai-task-tracker');
    const panel = document.getElementById('ai-agent-panel');
    if (!tracker || !workflow || !workflow.tasks) return;

    panel.classList.add('with-tracker');
    tracker.style.display = '';

    const aiTasks = workflow.tasks.filter(t => t.type === 'ai');
    const humanTasks = workflow.tasks.filter(t => t.type === 'human');
    const totalTasks = workflow.tasks.length;
    const completedTasks = workflow.tasks.filter(t => t.status === 'completed').length;

    const CHECK_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
    const CLOCK_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
    const PERSON_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

    tracker.innerHTML = `
      <div class="ai-task-tracker-header">
        <div class="ai-task-tracker-title">
          <span>TASKS (${totalTasks})</span>
          <small>${completedTasks} of ${totalTasks} tasks</small>
        </div>
        <div class="ai-task-progress-bar">
          <div class="ai-task-progress-fill" style="width:${(completedTasks / totalTasks * 100).toFixed(0)}%"></div>
        </div>
      </div>

      ${aiTasks.length > 0 ? `
        <div class="ai-task-section" style="border-bottom:1px solid var(--border);">
          <div class="ai-task-section-header">
            <span class="ai-task-section-label">AI TASKS (${aiTasks.length})</span>
          </div>
          ${aiTasks.map(t => `
            <div class="ai-task-item">
              <div class="ai-task-icon ${t.status}">
                ${t.status === 'completed' ? CHECK_SVG : t.status === 'running' ? '' : CLOCK_SVG}
              </div>
              <div>
                <div class="ai-task-text ${t.status === 'completed' ? 'completed' : ''}">${t.title}</div>
                <div class="ai-task-status ${t.status}">${t.status}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${humanTasks.length > 0 ? `
        <div class="ai-task-section">
          <div class="ai-task-section-header">
            <span class="ai-task-section-label">HUMAN TASKS (${humanTasks.length})</span>
          </div>
          ${humanTasks.map(t => `
            <div class="ai-human-task">
              <div class="ai-human-task-title">
                ${t.icon ? `<span style="margin-right:4px;">${t.icon}</span>` : ''}${t.title}
              </div>
              <div class="ai-human-task-assign">
                ${t.assignee ? `
                  <span class="badge" style="background:var(--success-bg);color:var(--success);">assigned</span>
                  <span class="avatar" style="width:18px;height:18px;font-size:8px;background:${t.assigneeColor || 'var(--text-muted)'};color:#fff;">${t.assigneeInitials || '?'}</span>
                  <span style="font-size:11px;color:var(--text-secondary);">${t.assignee}</span>
                ` : `
                  <span class="badge" style="background:var(--warning-bg);color:var(--warning);">unassigned</span>
                  <span style="font-size:11px;color:var(--gold);cursor:pointer;position:relative;" onclick="MaestroAI.showAssignDropdown(this)">+ Assign</span>
                `}
              </div>
              <div class="ai-human-task-notes">
                <div class="ai-human-task-notes-header" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'':'none'">
                  <span class="ai-human-task-notes-label">AI Notes</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                </div>
                <div style="display:none;">
                  ${t.aiNotes ? `<div class="ai-human-task-notes-body">${t.aiNotes}</div>` : ''}
                </div>
              </div>
              <div class="ai-human-task-notes" style="margin-top:4px;">
                <span class="ai-human-task-notes-label">Notes</span>
                <textarea class="ai-human-task-notes-input" rows="2" placeholder="Add notes...">${t.notes || ''}</textarea>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  function updateTaskStatus(taskIndex, status) {
    // Update task status and re-render tracker
    const workflow = AI_WORKFLOWS[agentContext];
    if (workflow && workflow.tasks && workflow.tasks[taskIndex]) {
      workflow.tasks[taskIndex].status = status;
      renderTaskTracker(workflow);
    }
  }

  function progressTasks(workflowId) {
    const workflow = AI_WORKFLOWS[workflowId];
    if (!workflow || !workflow.tasks) return;

    // Simulate progressive task completion
    let delay = 0;
    workflow.tasks.forEach((t, i) => {
      if (t.type !== 'ai') return;
      setTimeout(() => {
        t.status = 'running';
        renderTaskTracker(workflow);
        setTimeout(() => {
          t.status = 'completed';
          renderTaskTracker(workflow);
        }, 1500 + Math.random() * 1000);
      }, delay);
      delay += 2500;
    });
  }

  // ============================================================
  // Keyboard Shortcut
  // ============================================================
  function initKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        toggleBar();
      }
    });
  }

  // ============================================================
  // Inbox Chips Auto-Update
  // ============================================================
  let lastConvId = null;
  function watchConversationChanges() {
    if (!currentScreen.startsWith('inbox')) return;
    setInterval(() => {
      const newConvId = typeof currentConvId !== 'undefined' ? currentConvId : null;
      if (newConvId && newConvId !== lastConvId) {
        lastConvId = newConvId;
        const container = document.getElementById('inbox-ai-chips');
        if (container) {
          container.innerHTML = '';
          const ctx = getContext();
          const suggestions = getSuggestions(ctx);
          renderChips(container, suggestions);
        }
      }
    }, 500);
  }

  // ============================================================
  // Init
  // ============================================================
  function init() {
    currentScreen = detectScreen();
    renderAIBar();
    initKeyboardShortcut();
    watchConversationChanges();
  }

  // ============================================================
  // Assign Dropdown (replaces placeholder toast)
  // ============================================================
  const TEAM_MEMBERS = [
    { name: 'Angua von Uberwald', initials: 'AV', color: '#6366f1' },
    { name: 'Carrot Ironfoundersson', initials: 'CI', color: '#f59e0b' },
    { name: 'Cheery Littlebottom', initials: 'CL', color: '#10b981' },
    { name: 'Detritus', initials: 'DE', color: '#ef4444' },
  ];

  function showAssignDropdown(trigger) {
    // Remove any existing dropdown
    document.querySelectorAll('.ai-assign-dropdown').forEach(d => d.remove());

    const dropdown = document.createElement('div');
    dropdown.className = 'ai-assign-dropdown';
    dropdown.innerHTML = TEAM_MEMBERS.map(m => `
      <div class="ai-assign-dropdown-item" data-name="${m.name}" data-initials="${m.initials}" data-color="${m.color}">
        <span class="avatar" style="width:20px;height:20px;font-size:9px;background:${m.color};color:#fff;">${m.initials}</span>
        ${m.name}
      </div>
    `).join('');

    // Position relative to trigger
    const rect = trigger.getBoundingClientRect();
    dropdown.style.position = 'fixed';
    dropdown.style.top = (rect.bottom + 4) + 'px';
    dropdown.style.left = rect.left + 'px';

    dropdown.querySelectorAll('.ai-assign-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.dataset.name;
        const initials = item.dataset.initials;
        const color = item.dataset.color;
        // Update the parent task's assign area
        const taskEl = trigger.closest('.ai-human-task');
        if (taskEl) {
          const assignArea = taskEl.querySelector('.ai-human-task-assign');
          if (assignArea) {
            assignArea.innerHTML = `
              <span class="badge" style="background:var(--success-bg);color:var(--success);">assigned</span>
              <span class="avatar" style="width:18px;height:18px;font-size:8px;background:${color};color:#fff;">${initials}</span>
              <span style="font-size:11px;color:var(--text-secondary);">${name}</span>
            `;
          }
        }
        dropdown.remove();
      });
    });

    document.body.appendChild(dropdown);

    // Close on outside click
    setTimeout(() => {
      const handler = (e) => {
        if (!dropdown.contains(e.target)) { dropdown.remove(); document.removeEventListener('click', handler); }
      };
      document.addEventListener('click', handler);
    }, 10);
  }

  // Public API
  return {
    init,
    openBar,
    closeBar,
    toggleBar,
    openAgentPanel,
    closeAgentPanel,
    minimizeAgent,
    sendAgentMessage,
    addToTrip,
    renderBriefingCard,
    renderChips,
    getContext,
    getSuggestions,
    showAssignDropdown,
  };
})();

// ============================================================
// AI Mock Data (contextual drafts, workflows, briefings)
// ============================================================

const AI_DRAFT_RESPONSES = {
  conv1: "Hi Samuel and Sybil! I've confirmed the Canaves Oia Suite with a sea view for May 10-14. The hotel has also arranged a private sunset dinner on your balcony for the first evening. I'll send the full itinerary update shortly.",
  conv2: "Great news on the anniversary dinner! I've secured a private terrace at La Colombe d'Or for June 23rd. They'll prepare a special tasting menu (shellfish-free for Juliana). I'm also looking into a surprise floral arrangement.",
  conv3: "Update on the Maldives trip: Soneva Fushi has confirmed the overwater villa upgrade at the negotiated rate. The seaplane transfer from Male is included. I'll share the revised pricing breakdown today.",
  conv4: "Hello! I've put together 3 family-friendly options in Panama and Costa Rica. Each includes kid-friendly activities and private transfers. Would you like me to walk you through the highlights?",
  conv5: "Lynda and Roberto, I have two villa options in Bali ready for your review: COMO Uma Ubud for the first week and a private beachfront villa in Seminyak for week two. Both accommodate your preference for ocean views.",
  conv6: "Kurt, the Belmond Caruso in Ravello is confirmed for your dates! The Amalfi suite has stunning coastal views. I'm also arranging a private boat tour of the coast and a cooking class in a local villa.",
  conv7: "Just touching base on the Japan planning! Cherry blossom peak is typically late March to mid-April in Tokyo. I'd recommend we start booking ryokans in Kyoto soon as they fill up 6 months out.",
  conv8: "Hi! I've looked into the points situation. With your current Chase UR balance (185K), you can book a round-trip in Delta One to Athens at 90K points with excellent availability on your dates.",
  conv9: "Good morning! A quick update: The Conrad Maldives has a special offer for extended stays (7+ nights) that includes daily breakfast and a spa credit. Shall I request a formal quote?",
  conv10: "Welcome to Maestro! I see you're interested in our Points Concierge service. Based on your Amex MR balance, there are some excellent first-class redemptions available. Would you like me to run a search?",
  conv11: "Just following up on the Patagonia trip request. I've identified two luxury lodge options: Awasi Patagonia and Explora Torres del Paine. Both offer all-inclusive packages with guided excursions.",
  conv12: "Update on the accessibility requirements: I've confirmed that the selected hotels all have wheelchair-accessible rooms and transfers. The private tours have been arranged with accessible vehicles.",
};

const AI_WORKFLOWS = {
  'research-venues': {
    steps: [
      { type: 'message', text: "I'd love to help find the perfect venue! Let me ask a few things to narrow down the best options." },
      { type: 'question', text: "What's the budget range?", options: ['Under $500', '$500-$1,000', '$1,000-$2,500', 'No limit'] },
      { type: 'question', text: 'What vibe are they looking for?', options: ['Intimate & romantic', 'Grand & luxurious', 'Casual but stunning', 'All of the above'] },
      { type: 'question', text: 'Any cuisine preferences or restrictions?', options: ['French/Mediterranean', 'Italian', 'Seafood-focused', 'Open to anything'] },
      { type: 'results', intro: "Here are the top 3 options I found based on the client's preferences:", cards: [
        { name: "La Colombe d'Or", price: '$$$$', description: 'Legendary restaurant in St-Paul-de-Vence with an intimate garden terrace surrounded by original Picasso, Matisse, and Chagall works. Classic Provencal cuisine.', rating: '4.8/5', status: 'Available' },
        { name: 'Le Louis XV by Alain Ducasse', price: '$$$$$', description: "Monaco's crown jewel -- 3 Michelin stars in the Hotel de Paris. Mediterranean haute cuisine in an opulent Belle Epoque dining room.", rating: '4.9/5', status: 'Available' },
        { name: 'Private Beach Dinner at Eden-Roc', price: '$$$$', description: 'Exclusive private dining on the rocky shore of Cap d\'Antibes. Custom menu, personal chef, sunset views over the Mediterranean.', rating: '5/5', status: 'Available' },
      ]},
      { type: 'followup', text: "I'll also flag a human task to call Eden-Roc about the private beach dinner setup, and another to get client approval. Want me to check availability for specific dates?" },
    ],
    tasks: [
      { type: 'ai', title: 'Search top-rated anniversary dinner venues on the French Riviera', status: 'queued' },
      { type: 'ai', title: 'Check availability for June 22-26 at top 3 venues', status: 'queued' },
      { type: 'ai', title: 'Draft comparison of dinner options for client review', status: 'queued' },
      { type: 'ai', title: 'Generate personalized recommendation based on client preferences', status: 'queued' },
      { type: 'human', title: 'Call Eden-Roc to discuss private beach dinner setup for anniversary surprise', icon: '\u260E', assignee: 'Chastine', assigneeInitials: 'CH', assigneeColor: '#06b6d4', aiNotes: 'Eden-Roc private beach dinner requires 2-week advance booking. Contact: Marie Dupont, events coordinator. Mention Maestro partnership for priority access. Shellfish-free menu must be confirmed.' },
      { type: 'human', title: "Get Gaurav's final approval on dinner choice (without spoiling the surprise to Anamitra)", icon: '\u26A0', aiNotes: 'Gaurav wants to surprise Anamitra. Do NOT mention specific venues in any shared communication. Use private channel or phone call only.' },
    ],
  },
  'research-activities': {
    steps: [
      { type: 'message', text: "Let me help find some amazing activities! A few quick questions:" },
      { type: 'question', text: 'What type of experience?', options: ['Cultural & history', 'Adventure & outdoor', 'Food & wine', 'Relaxation & wellness'] },
      { type: 'question', text: 'Group size and pace?', options: ['Private couple', 'Family with kids', 'Small group (3-6)', 'Solo traveler'] },
      { type: 'results', intro: "Here are curated experiences that match the client's profile:", cards: [
        { name: 'Private Vineyard Tour & Tasting', price: '$$$', description: 'Exclusive access to a family-owned estate in the hills. Includes cellar tour, barrel tasting, and paired lunch on the terrace.', rating: '4.9/5', status: 'Available' },
        { name: 'Sunset Sailing Experience', price: '$$', description: 'Private catamaran cruise along the coast with champagne, canapes, and swimming stops at secluded coves.', rating: '4.7/5', status: 'Available' },
        { name: 'Historic Village Walking Tour', price: '$$', description: 'Led by a local historian through medieval streets, artisan workshops, and hidden chapels. Ends at a local cafe.', rating: '4.8/5', status: 'Available' },
      ]},
      { type: 'followup', text: "These are popular choices for the area. Shall I check availability for specific dates or add any of these to the trip?" },
    ],
    tasks: [
      { type: 'ai', title: 'Search curated experiences matching client profile', status: 'queued' },
      { type: 'ai', title: 'Check availability for trip dates', status: 'queued' },
      { type: 'ai', title: 'Generate activity recommendations', status: 'queued' },
      { type: 'human', title: 'Confirm booking details and dietary requirements with activity providers', icon: '\u260E', aiNotes: 'Verify group size and any accessibility needs before confirming.' },
    ],
  },
  'compare-hotels': {
    steps: [
      { type: 'message', text: "I'll pull together a hotel comparison. Let me check what's available in the area." },
      { type: 'question', text: 'What matters most to the client?', options: ['Location & views', 'Service & exclusivity', 'Value for money', 'Amenities & facilities'] },
      { type: 'results', intro: "Here's a comparison of the top options:", cards: [
        { name: 'Aman Venice', price: '$$$$$', description: 'Intimate 24-suite palazzo on the Grand Canal. Unparalleled privacy and service. Private boat dock and garden.', rating: '4.9/5', status: '2 rooms left' },
        { name: 'Belmond Hotel Cipriani', price: '$$$$', description: 'Iconic island retreat across from St. Mark\'s. Olympic-size pool, Michelin-star dining, lush gardens.', rating: '4.8/5', status: 'Available' },
        { name: 'The Gritti Palace', price: '$$$$', description: 'Historic landmark on the Grand Canal. Venetian elegance meets modern luxury. Club del Doge restaurant.', rating: '4.7/5', status: 'Available' },
      ]},
      { type: 'followup', text: "The Aman Venice has limited availability -- I'd recommend holding a room if the client is interested. Want me to check rates and request a hold?" },
    ],
    tasks: [
      { type: 'ai', title: 'Search available hotels in destination area', status: 'queued' },
      { type: 'ai', title: 'Compare rates, amenities, and availability', status: 'queued' },
      { type: 'ai', title: 'Generate comparison table for client review', status: 'queued' },
      { type: 'human', title: 'Request hold on preferred hotel before availability expires', icon: '\u26A0', aiNotes: 'Aman Venice has only 2 rooms left. Standard hold period is 48 hours. Contact reservations directly for extended hold.' },
    ],
  },
};

const AI_BRIEFINGS = {
  // Task briefings by task ID
  tk1: {
    entityId: 'tk1',
    text: "The Ridcullys are celebrating their 20th anniversary at Eden-Roc. Juliana has a shellfish allergy (noted in her client profile). The restaurant's standard tasting menu includes lobster and crab courses. Request the chef prepare a modified menu -- they've accommodated this before for Maestro clients. Contact: Marie Dupont, events coordinator.",
    chips: [
      { label: 'Draft menu request email', action: 'draft-reply' },
      { label: 'Check dietary notes', action: 'client-summary' },
    ],
  },
  tk2: {
    entityId: 'tk2',
    text: "Canaves Oia Epitome is fully booked for May 10-14. Waitlist position: #2. Alternative options in Santorini: Grace Hotel (available, similar tier), Katikies (1 suite left). The Vimes household prefers boutique properties with caldera views. Escalation needed by May 1 or we risk losing the dates entirely.",
    chips: [
      { label: 'Compare alternatives', action: 'compare-hotels' },
      { label: 'Draft client options', action: 'draft-update' },
    ],
  },
  tk3: {
    entityId: 'tk3',
    text: "Soneva Fushi Water Villa upgrade: published rate is $2,800/night, current booking at $2,200/night (Garden Villa). Upgrade differential: $600/night x 7 nights = $4,200. Maestro has placed 4 groups at Soneva this year -- leverage for negotiation. Contact preferred partner rep: Dewi Santoso, dewi@soneva.com.",
    chips: [
      { label: 'Draft negotiation email', action: 'draft-reply' },
      { label: 'Check budget impact', action: 'budget-check' },
    ],
  },
  tk4: {
    entityId: 'tk4',
    text: "Lynda and Roberto Diamonte are looking at a 14-night stay at The Mulia Bali (Ocean Villa category). Published rate is $1,800/night. For a 2-week stay, we should negotiate a 20-25% discount plus complimentary airport transfers and daily breakfast. Contact our preferred partner rep, Dewi Santoso, directly -- we have placed 3 groups there this year.",
    chips: [
      { label: 'Draft rate request', action: 'draft-reply' },
      { label: 'Compare Bali options', action: 'compare-hotels' },
    ],
  },
  tk5: {
    entityId: 'tk5',
    text: "Singapore Airlines Suites SFO-SIN: extremely limited availability. Only 4 Suites seats per A380 flight. Best redemption: 92,000 KrisFlyer miles one-way. The Selachii family needs 2 Suites seats. Check: dates Jul 28-Aug 3, alternatives via NRT or HKG routing. Partner award availability through Star Alliance may offer better odds.",
    chips: [
      { label: 'Check availability', action: 'check-avail' },
      { label: 'Compare routing options', action: 'compare-programs' },
    ],
  },
  // Dashboard briefing
  dashboard: {
    entityId: 'dashboard',
    text: '',  // Generated dynamically
    chips: [
      { label: 'End-of-day summary', action: 'eod-summary' },
      { label: 'What should I prioritize?', action: 'prioritize' },
      { label: 'Show SLA risks', action: 'sla-risks' },
    ],
  },
};

// Auto-init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  MaestroAI.init();
});

// Generate dynamic dashboard briefing
function generateDashboardBriefing() {
  const stats = getDashboardStats();
  const unassigned = getUnassignedConversations();
  const breached = CONVERSATIONS.filter(c => c.slaStatus === 'breached');
  const overdue = TASKS.filter(t => t.dueIn && t.dueIn.includes('overdue'));
  const urgent = TASKS.filter(t => t.priority === 'Urgent');

  let text = `Good morning. You have ${stats.openConversations} open conversations`;
  if (unassigned.length > 0) text += `, ${unassigned.length} unassigned`;
  text += `. ${urgent.length} urgent and ${overdue.length} overdue tasks.`;
  if (breached.length > 0) {
    const names = breached.map(c => { const h = getHousehold(c.householdId); return h ? h.name : 'Unknown'; });
    text += ` SLA breached for: ${names.join(', ')}.`;
  }

  // Upcoming trip milestones
  const activeTravelTrips = TRIPS.filter(t => t.stage === 'Active Travel' || t.stage === 'Confirmed');
  if (activeTravelTrips.length > 0) {
    text += ` ${activeTravelTrips.length} trip(s) in active travel or confirmed stage.`;
  }

  return text;
}
