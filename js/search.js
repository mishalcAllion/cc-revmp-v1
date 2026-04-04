/* ============================================================
   Maestro Command Centre — Global Search Engine
   Shared by search.html (full page) and command palette (Ctrl+K)
   ============================================================ */

(function() {

  // ---- Entity type config ----
  const ENTITY_TYPES = [
    { key: 'clients',       label: 'Clients',       color: '#6366f1' },
    { key: 'trips',         label: 'Trips',         color: '#D4AF37' },
    { key: 'tasks',         label: 'Tasks',         color: '#f59e0b' },
    { key: 'conversations', label: 'Conversations', color: '#10b981' },
    { key: 'alerts',        label: 'Alerts',        color: '#ef4444' },
    { key: 'ai-threads',    label: 'AI Threads',    color: '#8b5cf6' },
  ];

  // ---- SVG Icons ----
  const ICONS = {
    users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    map: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3Z"/><path d="m9 4v13"/><path d="m15 7v13"/></svg>',
    checkSq: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
    inbox: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    bell: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    sparkle: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5Z"/><path d="M19 3L19.75 5.25L22 6L19.75 6.75L19 9L18.25 6.75L16 6L18.25 5.25Z"/><path d="M5 17L5.75 19.25L8 20L5.75 20.75L5 23L4.25 20.75L2 20L4.25 19.25Z"/></svg>',
    chevronRight: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  };

  function iconForType(type) {
    const map = { clients: 'users', trips: 'map', tasks: 'checkSq', conversations: 'inbox', alerts: 'bell', 'ai-threads': 'sparkle' };
    return ICONS[map[type]] || ICONS.search;
  }

  function colorForType(type) {
    const t = ENTITY_TYPES.find(e => e.key === type);
    return t ? t.color : '#64748b';
  }

  // ---- Substring match helpers ----
  function matchField(text, query) {
    if (!text || !query) return false;
    return String(text).toLowerCase().includes(query.toLowerCase());
  }

  function scoreItem(fields, query) {
    // fields: [{value, weight}]
    // returns total score (0 = no match)
    let score = 0;
    for (const { value, weight } of fields) {
      if (matchField(value, query)) score += weight;
    }
    return score;
  }

  // ---- Highlight matching text ----
  function highlight(text, query) {
    if (!text || !query) return escapeHtml(text || '');
    const escaped = escapeHtml(text);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped.replace(new RegExp(`(${escapedQuery})`, 'gi'), '<mark class="search-highlight">$1</mark>');
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ---- Detail URL mapping ----
  function getDetailUrl(type, item, fromSearch) {
    const prefix = fromSearch ? '' : '';
    switch (type) {
      case 'clients':       return `client-detail.html?id=${item.id}`;
      case 'trips':         return `trip-detail.html?id=${item.id}`;
      case 'tasks':         return `tasks.html`;
      case 'conversations': return `inbox-compact.html?conv=${item.id}`;
      case 'alerts':        return `alerts.html`;
      case 'ai-threads':    return `ai-history.html`;
    }
    return '#';
  }

  // ---- Per-entity search functions ----
  function searchClients(query) {
    return CLIENTS.filter(c => {
      const prefsFlat = c.preferences ? Object.values(c.preferences).join(' ') : '';
      return scoreItem([
        { value: c.name,    weight: 3 },
        { value: c.email,   weight: 2 },
        { value: c.phone,   weight: 2 },
        { value: c.tier,    weight: 1 },
        { value: c.status,  weight: 1 },
        { value: prefsFlat, weight: 1 },
      ], query) > 0;
    }).map(c => {
      const household = typeof getHousehold === 'function' ? getHousehold(c.householdId) : null;
      return { type: 'clients', item: c, meta: { householdName: household ? household.name : '' } };
    });
  }

  function searchTrips(query) {
    return TRIPS.filter(t => {
      const household = typeof getHousehold === 'function' ? getHousehold(t.householdId) : null;
      const agent = typeof getAgent === 'function' ? getAgent(t.agentId) : null;
      return scoreItem([
        { value: t.name,         weight: 3 },
        { value: t.destinations, weight: 2 },
        { value: household ? household.name : '', weight: 2 },
        { value: t.stage,        weight: 1 },
        { value: t.status,       weight: 1 },
        { value: agent ? agent.name : '', weight: 1 },
      ], query) > 0;
    }).map(t => {
      const household = typeof getHousehold === 'function' ? getHousehold(t.householdId) : null;
      const agent = typeof getAgent === 'function' ? getAgent(t.agentId) : null;
      const stage = typeof PIPELINE_STAGES !== 'undefined' ? PIPELINE_STAGES.find(s => s.id === t.stage) : null;
      return { type: 'trips', item: t, meta: { householdName: household ? household.name : '', agentName: agent ? agent.name : '', stageLabel: stage ? stage.label : t.stage, stageColor: stage ? stage.color : '#64748b' } };
    });
  }

  function searchTasks(query) {
    return TASKS.filter(task => {
      const agent = typeof getAgent === 'function' ? getAgent(task.assignedTo) : null;
      return scoreItem([
        { value: task.title,    weight: 3 },
        { value: task.venue,    weight: 2 },
        { value: agent ? agent.name : '', weight: 2 },
        { value: task.status,   weight: 1 },
        { value: task.priority, weight: 1 },
        { value: task.source,   weight: 1 },
      ], query) > 0;
    }).map(task => {
      const agent = typeof getAgent === 'function' ? getAgent(task.assignedTo) : null;
      const household = typeof getHousehold === 'function' ? getHousehold(task.householdId) : null;
      return { type: 'tasks', item: task, meta: { agentName: agent ? agent.name : '', householdName: household ? household.name : '' } };
    });
  }

  function searchConversations(query) {
    return CONVERSATIONS.filter(conv => {
      const household = typeof getHousehold === 'function' ? getHousehold(conv.householdId) : null;
      const trip = typeof getTrip === 'function' ? getTrip(conv.tripId) : null;
      const agent = typeof getAgent === 'function' ? getAgent(conv.assignedTo) : null;
      return scoreItem([
        { value: household ? household.name : '', weight: 3 },
        { value: trip ? trip.name : '',           weight: 3 },
        { value: conv.lastMessage,                weight: 2 },
        { value: conv.channel,                    weight: 1 },
        { value: agent ? agent.name : '',         weight: 1 },
        { value: conv.slaStatus,                  weight: 1 },
      ], query) > 0;
    }).map(conv => {
      const household = typeof getHousehold === 'function' ? getHousehold(conv.householdId) : null;
      const trip = typeof getTrip === 'function' ? getTrip(conv.tripId) : null;
      const agent = typeof getAgent === 'function' ? getAgent(conv.assignedTo) : null;
      return { type: 'conversations', item: conv, meta: { householdName: household ? household.name : '', tripName: trip ? trip.name : '', agentName: agent ? agent.name : '' } };
    });
  }

  function searchAlerts(query) {
    return ALERTS.filter(al => {
      const client = typeof getClient === 'function' ? getClient(al.clientId) : null;
      return scoreItem([
        { value: al.route,   weight: 3 },
        { value: client ? client.name : '', weight: 2 },
        { value: al.program, weight: 2 },
        { value: al.cabin,   weight: 1 },
        { value: al.status,  weight: 1 },
      ], query) > 0;
    }).map(al => {
      const client = typeof getClient === 'function' ? getClient(al.clientId) : null;
      return { type: 'alerts', item: al, meta: { clientName: client ? client.name : '' } };
    });
  }

  function searchAIThreads(query) {
    return AI_THREADS.filter(t => {
      const agent = typeof getAgent === 'function' ? getAgent(t.agentId) : null;
      const household = typeof getHousehold === 'function' ? getHousehold(t.householdId) : null;
      const trip = typeof getTrip === 'function' ? getTrip(t.tripId) : null;
      return scoreItem([
        { value: t.title,        weight: 3 },
        { value: t.contextType,  weight: 2 },
        { value: agent ? agent.name : '',     weight: 2 },
        { value: household ? household.name : '', weight: 1 },
        { value: trip ? trip.name : '',       weight: 1 },
      ], query) > 0;
    }).map(t => {
      const agent = typeof getAgent === 'function' ? getAgent(t.agentId) : null;
      const trip = typeof getTrip === 'function' ? getTrip(t.tripId) : null;
      return { type: 'ai-threads', item: t, meta: { agentName: agent ? agent.name : '', tripName: trip ? trip.name : '' } };
    });
  }

  // ---- Main search function ----
  function search(query, typeFilter) {
    if (!query || query.trim().length < 1) return [];
    const q = query.trim();
    const filter = typeFilter || 'all';

    let results = [];
    const run = (key, fn) => { if (filter === 'all' || filter === key) results = results.concat(fn(q)); };

    run('clients', searchClients);
    run('trips', searchTrips);
    run('tasks', searchTasks);
    run('conversations', searchConversations);
    run('alerts', searchAlerts);
    run('ai-threads', searchAIThreads);

    return results.slice(0, 60);
  }

  // ---- Render: Full result card (search page) ----
  function renderFullResult(result, query) {
    const { type, item, meta } = result;
    const url = getDetailUrl(type, item, true);
    const color = colorForType(type);
    const icon = iconForType(type);
    const typeConfig = ENTITY_TYPES.find(e => e.key === type);
    const typeLabel = typeConfig ? typeConfig.label.slice(0,-1) : type; // singular

    let title = '', subtitle = '', chips = [];

    switch (type) {
      case 'clients':
        title = item.name;
        subtitle = [item.email, item.phone].filter(Boolean).join(' · ');
        chips = [
          { label: item.tier, style: item.tier === 'VIP' ? 'background:rgba(212,175,55,0.15);color:var(--gold);' : '' },
          { label: item.status },
          meta.householdName ? { label: meta.householdName + ' household' } : null,
        ].filter(Boolean);
        break;
      case 'trips':
        title = item.name;
        subtitle = [item.destinations, item.dates].filter(Boolean).join(' · ');
        chips = [
          { label: meta.stageLabel, style: `background:${meta.stageColor}22;color:${meta.stageColor};` },
          meta.householdName ? { label: meta.householdName } : null,
          item.budget ? { label: item.budget } : null,
        ].filter(Boolean);
        break;
      case 'tasks':
        title = item.title;
        subtitle = item.venue || '';
        const priorityColors = { Urgent: '#ef4444', High: '#f59e0b', Normal: '#6366f1', Low: '#94a3b8' };
        chips = [
          { label: item.priority, style: `background:${priorityColors[item.priority] || '#64748b'}22;color:${priorityColors[item.priority] || '#64748b'};` },
          { label: item.status },
          meta.agentName ? { label: meta.agentName } : null,
        ].filter(Boolean);
        break;
      case 'conversations':
        title = meta.householdName || 'Conversation';
        subtitle = item.lastMessage ? (item.lastMessage.length > 80 ? item.lastMessage.slice(0,80) + '…' : item.lastMessage) : '';
        const slaColors = { breached: '#ef4444', critical: '#f59e0b', warning: '#D4AF37', healthy: '#10b981' };
        chips = [
          meta.tripName ? { label: meta.tripName } : { label: 'General' },
          { label: item.channel === 'whatsapp' ? 'WhatsApp' : 'Stream' },
          { label: item.slaStatus, style: `background:${slaColors[item.slaStatus] || '#64748b'}22;color:${slaColors[item.slaStatus] || '#64748b'};` },
        ].filter(Boolean);
        break;
      case 'alerts':
        title = item.route;
        subtitle = [item.program, item.dates].filter(Boolean).join(' · ');
        const alertStatusColors = { Active: '#10b981', Triggered: '#6366f1', Paused: '#94a3b8' };
        chips = [
          { label: item.cabin },
          { label: item.maxPoints + ' pts max' },
          { label: item.status, style: `background:${alertStatusColors[item.status] || '#64748b'}22;color:${alertStatusColors[item.status] || '#64748b'};` },
          meta.clientName ? { label: meta.clientName } : null,
        ].filter(Boolean);
        break;
      case 'ai-threads':
        title = item.title;
        subtitle = meta.tripName || (item.contextType ? item.contextType.charAt(0).toUpperCase() + item.contextType.slice(1) + ' context' : '');
        chips = [
          { label: item.contextType },
          { label: item.status },
          meta.agentName ? { label: meta.agentName } : null,
        ].filter(Boolean);
        break;
    }

    const chipsHtml = chips.slice(0,3).map(ch =>
      `<span class="search-type-badge" style="${ch.style || ''}">${escapeHtml(ch.label)}</span>`
    ).join('');

    return `
      <a href="${url}" class="search-result-card" data-type="${type}">
        <span class="search-result-icon" style="background:${color}18;color:${color};">${icon}</span>
        <span class="search-result-body">
          <span class="search-result-title">${highlight(title, query)}</span>
          ${subtitle ? `<span class="search-result-sub">${highlight(subtitle, query)}</span>` : ''}
          <span class="search-result-chips">${chipsHtml}</span>
        </span>
        <span class="search-result-arrow">${ICONS.chevronRight}</span>
      </a>`;
  }

  // ---- Render: Compact result row (command palette) ----
  function renderCompactResult(result, query) {
    const { type, item, meta } = result;
    const url = getDetailUrl(type, item, false);
    const color = colorForType(type);
    const icon = iconForType(type);
    const typeConfig = ENTITY_TYPES.find(e => e.key === type);
    const typeLabel = typeConfig ? typeConfig.label.slice(0,-1) : type;

    let label = '';
    let sub = '';
    switch (type) {
      case 'clients':       label = item.name; sub = item.email || ''; break;
      case 'trips':         label = item.name; sub = item.destinations || ''; break;
      case 'tasks':         label = item.title; sub = item.priority + ' · ' + item.status; break;
      case 'conversations': label = (meta.householdName || '') + (meta.tripName ? ' — ' + meta.tripName : ''); sub = item.lastMessage ? item.lastMessage.slice(0,50) + (item.lastMessage.length > 50 ? '…' : '') : ''; break;
      case 'alerts':        label = item.route; sub = item.program || ''; break;
      case 'ai-threads':    label = item.title; sub = item.contextType || ''; break;
    }

    return `
      <a href="${url}" class="cmd-result-item">
        <span class="cmd-result-icon" style="background:${color}18;color:${color};">${icon}</span>
        <span class="cmd-result-body">
          <span class="cmd-result-label">${highlight(label, query)}</span>
          ${sub ? `<span class="cmd-result-sub">${escapeHtml(sub)}</span>` : ''}
        </span>
        <span class="search-type-badge" style="background:${color}18;color:${color};margin-left:auto;flex-shrink:0;">${typeLabel}</span>
      </a>`;
  }

  // ---- Expose globally ----
  window.MaestroSearch = {
    ENTITY_TYPES,
    search,
    renderFullResult,
    renderCompactResult,
    getDetailUrl,
    highlight,
    escapeHtml,
    iconForType,
    colorForType,
  };

})();
