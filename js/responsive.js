/* ============================================================
   Maestro Command Centre — Responsive Behavior
   Mobile navigation, inbox panel manager, kanban accordion.
   Loaded LAST on every screen.
   ============================================================ */

(function() {
  'use strict';

  // --- Breakpoint helpers ---
  const mqMobile = window.matchMedia('(max-width: 767px)');
  const mqTabletDown = window.matchMedia('(max-width: 1023px)');

  // ============================================================
  // MobileNav — Hamburger + Sidebar Drawer
  // ============================================================
  const MobileNav = {
    hamburger: null,
    overlay: null,
    isOpen: false,

    init() {
      // Skip on pages without a sidebar (e.g. index.html)
      if (!document.getElementById('sidebar')) return;

      // Inject hamburger button
      this.hamburger = document.createElement('button');
      this.hamburger.className = 'mobile-hamburger';
      this.hamburger.setAttribute('aria-label', 'Open navigation menu');
      this.hamburger.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
      document.body.appendChild(this.hamburger);

      // Inject overlay
      this.overlay = document.createElement('div');
      this.overlay.className = 'sidebar-overlay';
      document.body.appendChild(this.overlay);

      // Bind events
      this.hamburger.addEventListener('click', (e) => { e.stopPropagation(); this.toggle(); });
      this.overlay.addEventListener('click', (e) => { e.stopPropagation(); this.close(); });

      // Close on nav item click (mobile)
      document.addEventListener('click', (e) => {
        if (this.isOpen && e.target.closest('.nav-item') && !e.target.closest('#sidebar-toggle')) {
          // Small delay so navigation starts before closing
          setTimeout(() => this.close(), 100);
        }
      });

      // Escape key closes
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      });

      // On resize to desktop, clean up
      mqTabletDown.addEventListener('change', (e) => {
        if (!e.matches) {
          this.close();
          this._restoreDesktop();
        } else {
          this._applyMobile();
        }
      });

      // Initial state
      if (mqTabletDown.matches) {
        this._applyMobile();
      }

      // Add header padding for hamburger clearance
      this._addHeaderPad();
    },

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    open() {
      const sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      sidebar.classList.add('mobile-open');
      this.overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      this.isOpen = true;
      this.hamburger.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    },

    close() {
      const sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      sidebar.classList.remove('mobile-open');
      this.overlay.classList.remove('open');
      document.body.style.overflow = '';
      this.isOpen = false;
      this.hamburger.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    },

    _applyMobile() {
      if (window.MaestroNav) {
        window.MaestroNav._origGetSidebarWidth = window.MaestroNav._origGetSidebarWidth || window.MaestroNav.getSidebarWidth;
        window.MaestroNav.getSidebarWidth = () => 0;
      }
    },

    _restoreDesktop() {
      // Restore original getSidebarWidth
      if (window.MaestroNav && window.MaestroNav._origGetSidebarWidth) {
        window.MaestroNav.getSidebarWidth = window.MaestroNav._origGetSidebarWidth;
      }
      // Restore sidebar position and margin
      const wrapper = document.getElementById('main-wrapper');
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.style.left = '0px';
        sidebar.style.transition = '';
      }
      if (wrapper) {
        const w = window.MaestroNav ? window.MaestroNav.getSidebarWidth() : 240;
        wrapper.style.marginLeft = w + 'px';
      }
    },

    _addHeaderPad() {
      // On mobile, first header-like element inside main-wrapper gets left padding for hamburger
      if (!mqTabletDown.matches) return;
      const wrapper = document.getElementById('main-wrapper');
      if (!wrapper) return;
      // Find the first header area (varies per screen)
      const firstHeader = wrapper.querySelector('.px-3, .px-4, .px-5, .px-6, [class*="px-"]');
      if (firstHeader && !firstHeader.closest('.inbox-layout') && !firstHeader.closest('#conv-list-pane')) {
        firstHeader.classList.add('mobile-header-pad');
      }
    }
  };

  // ============================================================
  // InboxPanelManager — 3-pane to single-pane on mobile
  // ============================================================
  const InboxPanelManager = {
    layout: null,
    panes: [],
    current: 'list',
    active: false,

    init() {
      this.layout = document.getElementById('inbox-layout');
      if (!this.layout) return;

      this.layout.classList.add('inbox-layout');
      this.panes = Array.from(this.layout.children).filter(el => el.tagName === 'DIV');

      // Set pane IDs if not already set
      if (this.panes[0] && !this.panes[0].id) this.panes[0].id = 'conv-list-pane';
      if (this.panes[1] && !this.panes[1].id) this.panes[1].id = 'thread-pane';
      if (this.panes[2] && !this.panes[2].id) this.panes[2].id = 'context-panel';

      // Wire conversation clicks to show thread
      this.layout.addEventListener('click', (e) => {
        if (!mqMobile.matches) return;
        const convItem = e.target.closest('.conv-item, [data-conv-id], [onclick*="selectConversation"]');
        if (convItem && convItem.closest('#conv-list-pane')) {
          // Let the existing selectConversation run first, then switch pane
          setTimeout(() => this.show('thread'), 50);
        }
      });

      // Wire context toggle
      const ctxToggle = document.getElementById('toggle-context');
      if (ctxToggle) {
        ctxToggle.addEventListener('click', () => {
          if (mqMobile.matches) {
            this.show('context');
          } else if (mqTabletDown.matches) {
            // Tablet: slide-over context panel
            const panel = document.getElementById('context-panel');
            if (panel) panel.classList.toggle('tablet-open');
          }
        });
      }

      // Inject back buttons
      this._injectBackButtons();

      // Listen for breakpoint changes
      mqMobile.addEventListener('change', (e) => {
        if (e.matches) {
          this._activate();
        } else {
          this._deactivate();
        }
      });

      // Initial state
      if (mqMobile.matches) {
        this._activate();
      }
    },

    show(panel) {
      if (!this.active && mqMobile.matches) this._activate();
      if (!this.active) return;

      const map = { list: 0, thread: 1, context: 2 };
      const idx = map[panel];
      if (idx === undefined) return;

      this.panes.forEach((p, i) => {
        if (i === idx) {
          p.classList.add('pane-active');
        } else {
          p.classList.remove('pane-active');
        }
      });
      this.current = panel;
    },

    _activate() {
      this.active = true;
      this.show(this.current || 'list');
    },

    _deactivate() {
      this.active = false;
      // Restore all panes to visible
      this.panes.forEach(p => {
        p.classList.remove('pane-active');
        p.style.display = '';
        p.style.width = '';
        p.style.minWidth = '';
      });
      // Close tablet context overlay
      const panel = document.getElementById('context-panel');
      if (panel) panel.classList.remove('tablet-open');
    },

    _injectBackButtons() {
      // Back button for thread pane → list
      const threadPane = this.panes[1];
      if (threadPane) {
        const firstChild = threadPane.querySelector('.border-b, .px-3, .flex');
        if (firstChild) {
          const btn = document.createElement('button');
          btn.className = 'mobile-back-btn';
          btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg> Inbox`;
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.show('list');
          });
          firstChild.parentNode.insertBefore(btn, firstChild);
        }
      }

      // Back button for context pane → thread
      const contextPane = this.panes[2];
      if (contextPane) {
        const btn = document.createElement('button');
        btn.className = 'mobile-back-btn';
        btn.style.borderBottom = '1px solid var(--border)';
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg> Back to thread`;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.show('thread');
        });
        contextPane.insertBefore(btn, contextPane.firstChild);
      }
    }
  };

  // ============================================================
  // MobileKanban — Vertical accordion for kanban boards
  // ============================================================
  const MobileKanban = {
    boards: [],

    init() {
      mqMobile.addEventListener('change', (e) => {
        if (e.matches) this._activate();
        else this._deactivate();
      });

      if (mqMobile.matches) {
        this._activate();
      }
    },

    _activate() {
      // Re-scan every time to pick up dynamically rendered boards
      this.boards = Array.from(document.querySelectorAll('[id*="kanban"], .flex.gap-4.h-full, [style*="min-width:max-content"]'));

      this.boards.forEach(board => {
        board.classList.add('kanban-board-mobile');

        // Fix parent + grandparent overflow so the accordion can scroll vertically
        [board.parentElement, board.parentElement && board.parentElement.parentElement].forEach(el => {
          if (!el || el.dataset.kanbanFixed) return;
          el.dataset.kanbanFixed = '1';
          el.dataset.kanbanOrigOverflowY = el.style.overflowY || '';
          el.dataset.kanbanOrigOverflowX = el.style.overflowX || '';
          el.dataset.kanbanOrigHeight   = el.style.height || '';
          el.style.overflowY = 'auto';
          el.style.overflowX = 'hidden';
          el.style.height    = 'auto';
        });

        const cols = board.querySelectorAll('.kanban-col');
        cols.forEach((col, i) => {
          // Skip if already processed
          if (col.querySelector('.kanban-col-toggle')) {
            if (i === 0 && !col.classList.contains('expanded')) col.classList.add('expanded');
            return;
          }

          const header = col.querySelector('.font-semibold, .text-xs.font-semibold, [class*="font-semibold"]');
          if (!header) return;

          // Walk up to find the direct child div of .kanban-col that contains the header
          let headerContainer = header.parentElement;
          while (headerContainer && headerContainer.parentElement !== col) {
            headerContainer = headerContainer.parentElement;
          }
          if (!headerContainer) headerContainer = header.parentElement;

          // Build the toggle
          const toggle = document.createElement('div');
          toggle.className = 'kanban-col-toggle';
          toggle.innerHTML = `
            <span style="display:flex;align-items:center;gap:8px;pointer-events:none;">${headerContainer.innerHTML}</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none;flex-shrink:0;"><path d="m6 9 6 6 6-6"/></svg>
          `;
          toggle.addEventListener('click', () => col.classList.toggle('expanded'));

          // Hide original header
          headerContainer.style.display = 'none';
          col.insertBefore(toggle, col.firstChild);

          // Wrap cards in a .kanban-cards container so the CSS can hide/show them
          const cardChildren = Array.from(col.children).filter(c => c !== toggle && c !== headerContainer);

          if (cardChildren.length === 1 && !cardChildren[0].classList.contains('kanban-card')) {
            // Single container div (trip-pipeline pattern) — just tag it
            cardChildren[0].classList.add('kanban-cards');
            cardChildren[0]._kanbanCardsTagged = true;
          } else if (cardChildren.length > 0) {
            // Multiple direct card children (tasks board pattern) — wrap them
            const wrapper = document.createElement('div');
            wrapper.className = 'kanban-cards';
            wrapper.dataset.kanbanWrapped = '1';
            cardChildren.forEach(c => wrapper.appendChild(c));
            col.appendChild(wrapper);
          }

          if (i === 0) col.classList.add('expanded');
        });
      });
    },

    _deactivate() {
      this.boards.forEach(board => {
        board.classList.remove('kanban-board-mobile');

        // Restore ancestor overflow
        [board.parentElement, board.parentElement && board.parentElement.parentElement].forEach(el => {
          if (!el || !el.dataset.kanbanFixed) return;
          el.style.overflowY = el.dataset.kanbanOrigOverflowY;
          el.style.overflowX = el.dataset.kanbanOrigOverflowX;
          el.style.height    = el.dataset.kanbanOrigHeight;
          delete el.dataset.kanbanFixed;
          delete el.dataset.kanbanOrigOverflowY;
          delete el.dataset.kanbanOrigOverflowX;
          delete el.dataset.kanbanOrigHeight;
        });

        const cols = board.querySelectorAll('.kanban-col');
        cols.forEach(col => {
          col.classList.remove('expanded');
          const toggle = col.querySelector('.kanban-col-toggle');
          if (!toggle) return;

          // Restore original header
          const hiddenHeader = col.querySelector('[style*="display: none"], [style*="display:none"]');
          if (hiddenHeader) hiddenHeader.style.display = '';

          // Unwrap wrapped cards (tasks pattern)
          const wrapped = col.querySelector('[data-kanban-wrapped]');
          if (wrapped) {
            Array.from(wrapped.children).forEach(c => col.appendChild(c));
            wrapped.remove();
          }

          // Remove tagged class from single container (trip-pipeline pattern)
          const tagged = col.querySelector('.kanban-cards');
          if (tagged && tagged._kanbanCardsTagged) {
            tagged.classList.remove('kanban-cards');
            delete tagged._kanbanCardsTagged;
          }

          toggle.remove();
        });
      });
    }
  };

  // ============================================================
  // AIHistoryPanelManager — 2-pane to single-pane
  // ============================================================
  const AIHistoryPanelManager = {
    layout: null,
    panes: [],
    current: 'list',
    active: false,

    init() {
      this.layout = document.querySelector('.ai-history-layout');
      if (!this.layout) return;

      this.panes = Array.from(this.layout.children).filter(el => el.tagName === 'DIV');

      // Wire thread clicks
      this.layout.addEventListener('click', (e) => {
        if (!mqMobile.matches) return;
        const threadItem = e.target.closest('[data-thread-id], .ai-thread-item');
        if (threadItem && this.panes[0] && this.panes[0].contains(threadItem)) {
          setTimeout(() => this.show('chat'), 50);
        }
      });

      // Inject back button for chat pane
      if (this.panes[1]) {
        const btn = document.createElement('button');
        btn.className = 'mobile-back-btn';
        btn.style.borderBottom = '1px solid var(--border)';
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg> Back`;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.show('list');
        });
        this.panes[1].insertBefore(btn, this.panes[1].firstChild);
      }

      mqMobile.addEventListener('change', (e) => {
        if (e.matches) this._activate();
        else this._deactivate();
      });

      if (mqMobile.matches) this._activate();
    },

    show(panel) {
      if (!this.active) return;
      const idx = panel === 'list' ? 0 : 1;
      this.panes.forEach((p, i) => {
        if (i === idx) p.classList.add('pane-active');
        else p.classList.remove('pane-active');
      });
      this.current = panel;
    },

    _activate() {
      this.active = true;
      this.show(this.current || 'list');
    },

    _deactivate() {
      this.active = false;
      this.panes.forEach(p => {
        p.classList.remove('pane-active');
        p.style.display = '';
      });
    }
  };

  // ============================================================
  // Init — detect screen and activate relevant modules
  // ============================================================
  function init() {
    // Always init mobile nav
    MobileNav.init();

    // Inbox screens
    if (document.getElementById('inbox-layout') || document.querySelector('[onclick*="selectConversation"]')) {
      // Set inbox-layout id if not present
      const inboxWrap = document.querySelector('#main-wrapper > .flex.h-screen.overflow-hidden');
      if (inboxWrap && !inboxWrap.id) inboxWrap.id = 'inbox-layout';
      InboxPanelManager.init();
    }

    // Kanban boards — also init on task/trip pages that render cols dynamically
    if (document.querySelector('.kanban-col') || document.getElementById('kanban-board') || document.getElementById('task-container')) {
      MobileKanban.init();
    }

    // AI History
    if (document.querySelector('.ai-history-layout')) {
      AIHistoryPanelManager.init();
    }
  }

  // Run after DOM is ready and other scripts have rendered
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
  } else {
    setTimeout(init, 100);
  }

  // Expose for inline handlers
  window.MobileResponsive = {
    MobileNav,
    InboxPanelManager,
    MobileKanban,
    AIHistoryPanelManager
  };
})();
