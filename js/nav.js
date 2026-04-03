/* ============================================================
   Maestro Command Centre — Sidebar Navigation
   Handles active state, collapse, and badge counts
   ============================================================ */

(function() {
  const SIDEBAR_KEY = 'maestro-cc-sidebar';

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'dashboard.html' },
    { id: 'inbox',   label: 'Inbox',     icon: 'inbox',    href: 'inbox-compact.html', badgeKey: 'unread' },
    { id: 'clients', label: 'Clients',   icon: 'users',    href: 'clients.html' },
    { id: 'trips',   label: 'Trips',     icon: 'map',      href: 'trip-pipeline.html' },
    { id: 'tasks',   label: 'Tasks',     icon: 'check-sq', href: 'tasks.html', badgeKey: 'myTasks' },
    { id: 'search',  label: 'Search',    icon: 'search',   href: '#search' },
    { id: 'alerts',  label: 'Alerts',    icon: 'bell',     href: 'alerts.html' },
    { id: 'settings',label: 'Settings',  icon: 'settings', href: 'settings.html' },
  ];

  const ICONS = {
    dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    inbox: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    map: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3Z"/><path d="m9 4v13"/><path d="m15 7v13"/></svg>',
    'check-sq': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
    search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    bell: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    collapse: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>',
    expand: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>',
  };

  function isCollapsed() {
    return localStorage.getItem(SIDEBAR_KEY) === 'collapsed';
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const collapsed = sidebar.classList.toggle('collapsed');
    localStorage.setItem(SIDEBAR_KEY, collapsed ? 'collapsed' : 'expanded');
    // Update toggle button icon
    const btn = document.getElementById('sidebar-toggle');
    if (btn) btn.innerHTML = collapsed ? ICONS.expand : ICONS.collapse;
  }

  function getActivePage() {
    const path = window.location.pathname.split('/').pop() || 'inbox-compact.html';
    return path;
  }

  function renderSidebar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentPage = getActivePage();
    const stats = typeof getInboxStats === 'function' ? getInboxStats() : { unread: 4 };
    const taskStats = typeof getTaskStats === 'function' ? getTaskStats() : { myTasks: 5 };
    const badges = { unread: stats.unread, myTasks: taskStats.myTasks };

    const collapsed = isCollapsed();

    let html = `
      <div id="sidebar" class="sidebar ${collapsed ? 'collapsed' : ''} flex flex-col h-screen transition-theme" style="position:fixed;left:0;top:0;z-index:30;">
        <!-- Header -->
        <div class="flex items-center px-3 h-14 border-b" style="border-color:var(--border);">
          <img src="https://maestroassets.s3.eu-north-1.amazonaws.com/public/Maestro-logo-simple.svg"
               alt="Maestro" class="h-5 sidebar-logo" style="min-width:20px;">
          <button id="sidebar-toggle" class="ml-auto nav-item p-1" style="padding:4px;margin:0;gap:0;" title="Toggle sidebar">
            ${collapsed ? ICONS.expand : ICONS.collapse}
          </button>
        </div>

        <!-- Nav items -->
        <nav class="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          ${NAV_ITEMS.map(item => {
            const isActive = currentPage.includes(item.id) ||
              (item.id === 'inbox' && (currentPage.includes('inbox') || currentPage.includes('conversation'))) ||
              (item.id === 'trips' && currentPage.includes('trip'));
            const badge = item.badgeKey && badges[item.badgeKey] ? `<span class="nav-badge">${badges[item.badgeKey]}</span>` : '';
            return `
              <a href="${item.href}" class="nav-item ${isActive ? 'active' : ''}" data-nav="${item.id}">
                <span class="nav-icon">${ICONS[item.icon]}</span>
                <span class="nav-label">${item.label}</span>
                ${badge}
              </a>`;
          }).join('')}
        </nav>

        <!-- Bottom: Theme toggle + User -->
        <div class="px-2 py-3 border-t space-y-1" style="border-color:var(--border);">
          <button class="nav-item theme-toggle" title="Toggle dark/light mode">
            <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span>
            <span class="nav-label">Theme</span>
          </button>
          <div class="nav-item" style="cursor:default;">
            <span class="avatar avatar-sm" style="background:#D4AF37;color:#000;font-size:9px;width:24px;height:24px;">AU</span>
            <span class="nav-label text-xs">Angua von Uberwald</span>
          </div>
          <a href="../index.html" class="nav-item" title="Back to prototype directory" style="opacity:0.55;">
            <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></span>
            <span class="nav-label text-xs">Directory</span>
          </a>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Bind toggle
    setTimeout(() => {
      const toggleBtn = document.getElementById('sidebar-toggle');
      if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);

      // Search opens command palette
      const searchNav = document.querySelector('[data-nav="search"]');
      if (searchNav) {
        searchNav.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof toggleCommandPalette === 'function') toggleCommandPalette();
        });
      }

      // Re-bind theme toggle (rendered after DOMContentLoaded)
      const themeBtn = container.querySelector('.theme-toggle');
      if (themeBtn && window.MaestroTheme) {
        themeBtn.addEventListener('click', window.MaestroTheme.toggle);
        window.MaestroTheme.set(window.MaestroTheme.get()); // sync icon state
      }
    }, 0);
  }

  function getSidebarWidth() {
    return isCollapsed() ? 56 : 240;
  }

  // Expose globally
  window.MaestroNav = { render: renderSidebar, getSidebarWidth, toggleSidebar, isCollapsed, NAV_ITEMS };
})();
