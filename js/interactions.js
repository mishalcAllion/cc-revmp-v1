/* ============================================================
   Maestro Command Centre — Interactions
   Command palette, modals, slide-overs, toasts
   ============================================================ */

// ---- Command Palette ----
function toggleCommandPalette() {
  const el = document.getElementById('cmd-palette');
  if (!el) return;
  el.classList.toggle('open');
  const backdrop = document.getElementById('cmd-backdrop');
  if (backdrop) backdrop.classList.toggle('open');
  if (el.classList.contains('open')) {
    const input = el.querySelector('input');
    if (input) { input.value = ''; input.focus(); }
  }
}

// ---- Modal ----
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// ---- Slide-over ----
function openSlideOver(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
  const backdrop = document.getElementById(id + '-backdrop');
  if (backdrop) backdrop.classList.add('open');
}
function closeSlideOver(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
  const backdrop = document.getElementById(id + '-backdrop');
  if (backdrop) backdrop.classList.remove('open');
}

// ---- Toast notification ----
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container') || createToastContainer();
  const colors = {
    success: 'background:var(--success);color:#fff;',
    error: 'background:var(--error);color:#fff;',
    warning: 'background:var(--warning);color:#fff;',
    info: 'background:var(--info);color:#fff;',
  };
  const toast = document.createElement('div');
  toast.style.cssText = `${colors[type] || colors.info} padding:10px 16px; border-radius:8px; font-size:13px; font-weight:500; box-shadow:var(--shadow-md); margin-top:8px; transition:opacity 0.3s; opacity:0;`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.style.opacity = '1');
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.id = 'toast-container';
  c.style.cssText = 'position:fixed;top:16px;right:16px;z-index:100;display:flex;flex-direction:column;align-items:flex-end;';
  document.body.appendChild(c);
  return c;
}

// ---- Tab switching ----
function initTabs(containerSelector) {
  document.querySelectorAll(containerSelector || '.tab-bar').forEach(bar => {
    bar.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        bar.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        if (target) {
          const parent = bar.closest('[data-tab-container]') || bar.parentElement;
          parent.querySelectorAll('[data-tab-content]').forEach(c => {
            c.style.display = c.dataset.tabContent === target ? '' : 'none';
          });
        }
      });
    });
  });
}

// ---- Filter dropdowns ----
function initFilters() {
  document.querySelectorAll('.select[data-filter]').forEach(select => {
    select.addEventListener('change', () => {
      const filterType = select.dataset.filter;
      const value = select.value;
      document.dispatchEvent(new CustomEvent('filter-change', { detail: { filterType, value } }));
    });
  });
}

// ---- Keyboard shortcuts ----
document.addEventListener('keydown', (e) => {
  // Cmd+K or Ctrl+K = Command palette
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    toggleCommandPalette();
  }
  // Escape = Close overlays
  if (e.key === 'Escape') {
    const palette = document.getElementById('cmd-palette');
    if (palette && palette.classList.contains('open')) {
      toggleCommandPalette();
      return;
    }
    document.querySelectorAll('.slide-over.open').forEach(s => {
      closeSlideOver(s.id);
    });
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      closeModal(m.id);
    });
  }
});

// ---- Init on DOM ready ----
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initFilters();
});

// ---- Dynamic Modal Builder ----
function buildAndOpenModal({ title, width, bodyHTML, buttons, id }) {
  const modalId = id || 'dynamic-modal-' + Date.now();

  // Remove any existing dynamic modal
  const existing = document.getElementById(modalId);
  if (existing) existing.remove();
  const existingBackdrop = document.getElementById(modalId + '-backdrop');
  if (existingBackdrop) existingBackdrop.remove();

  const backdrop = document.createElement('div');
  backdrop.id = modalId + '-backdrop';
  backdrop.className = 'modal-backdrop open';
  backdrop.onclick = () => closeDynamicModal(modalId);

  const panel = document.createElement('div');
  panel.className = 'modal-panel';
  panel.style.maxWidth = (width || 520) + 'px';
  panel.onclick = (e) => e.stopPropagation();

  const buttonsHTML = (buttons || []).map(btn =>
    `<button class="${btn.className || 'btn-ghost'}" onclick="${btn.onclick || ''}" style="${btn.style || ''}">${btn.label}</button>`
  ).join('');

  panel.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:between;">
      <h3 style="font-size:15px;font-weight:600;color:var(--text-primary);flex:1;">${title || 'Dialog'}</h3>
      <button onclick="closeDynamicModal('${modalId}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);padding:4px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
    <div style="padding:20px;">${bodyHTML || ''}</div>
    ${buttonsHTML.length ? `<div style="padding:12px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px;">${buttonsHTML}</div>` : ''}
  `;

  backdrop.appendChild(panel);
  document.body.appendChild(backdrop);
  // Focus first input if present
  setTimeout(() => { const inp = panel.querySelector('input,textarea,select'); if (inp) inp.focus(); }, 50);
  return modalId;
}

function closeDynamicModal(modalId) {
  const backdrop = document.getElementById(modalId + '-backdrop');
  if (backdrop) backdrop.remove();
}

// ---- Navigation Helpers ----
function navigateToInbox(convId) {
  window.location.href = 'inbox-compact.html' + (convId ? '?conv=' + convId : '');
}

// ---- AI Simulation Helpers ----
function simulateAIDraft(textareaId, draftText) {
  const textarea = document.getElementById(textareaId);
  if (!textarea) return;
  textarea.value = '';
  textarea.focus();
  let i = 0;
  const chars = draftText || 'Thank you for reaching out! I\'ve reviewed your request and here\'s what I recommend...';
  const interval = setInterval(() => {
    if (i < chars.length) {
      textarea.value += chars[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 15);
}

function simulateSend(textareaId) {
  const textarea = document.getElementById(textareaId);
  if (textarea) {
    textarea.value = '';
    textarea.placeholder = 'Message sent!';
    setTimeout(() => { textarea.placeholder = textarea.dataset.originalPlaceholder || 'Type your message...'; }, 2000);
  }
  showToast('Message sent!', 'success');
}

function simulateLoading(elementId, durationMs, callback) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const original = el.innerHTML;
  el.innerHTML = '<div style="display:flex;align-items:center;gap:8px;color:var(--text-muted);"><svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Processing...</div>';
  el.style.cssText += 'animation:spin 1s linear infinite;';
  setTimeout(() => {
    el.innerHTML = original;
    if (callback) callback(el);
  }, durationMs || 1500);
}

// ---- Common Modal Forms ----
function openTaskModal(tripId, householdName) {
  const agentOptions = (typeof AGENTS !== 'undefined' ? AGENTS : []).map(a =>
    `<option value="${a.id}">${a.name}</option>`
  ).join('');
  const tripOptions = (typeof TRIPS !== 'undefined' ? TRIPS : []).map(t =>
    `<option value="${t.id}" ${t.id === tripId ? 'selected' : ''}>${t.name}</option>`
  ).join('');

  buildAndOpenModal({
    title: 'Create Task',
    width: 480,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Title</label>
          <input class="input" placeholder="e.g. Confirm hotel reservation" id="task-title-input">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Assignee</label>
            <select class="select" style="width:100%;">${agentOptions}</select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Priority</label>
            <select class="select" style="width:100%;">
              <option>Normal</option><option>Urgent</option><option>High</option><option>Low</option>
            </select>
          </div>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Trip</label>
          <select class="select" style="width:100%;">${tripOptions}</select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Description</label>
          <textarea class="input" rows="3" placeholder="Task details..."></textarea>
        </div>
      </div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-task')" },
      { label: 'Create Task', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-task');showToast('Task created','success')" }
    ],
    id: 'dynamic-modal-task'
  });
}

function openFlightSearchModal() {
  buildAndOpenModal({
    title: 'Search Flights',
    width: 520,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">From</label>
            <input class="input" placeholder="e.g. SFO" value="">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">To</label>
            <input class="input" placeholder="e.g. ATH">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Depart</label>
            <input class="input" type="date">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Return</label>
            <input class="input" type="date">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Cabin</label>
            <select class="select" style="width:100%;">
              <option>Business</option><option>First</option><option>Economy</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Passengers</label>
            <input class="input" type="number" value="2" min="1">
          </div>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Points Program</label>
          <select class="select" style="width:100%;">
            <option>Any Program</option><option>Amex MR</option><option>Chase UR</option><option>Singapore KrisFlyer</option><option>AA AAdvantage</option>
          </select>
        </div>
      </div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-flights')" },
      { label: 'Search Flights', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-flights');showToast('Searching flights...','info')" }
    ],
    id: 'dynamic-modal-flights'
  });
}

function openHotelSearchModal() {
  buildAndOpenModal({
    title: 'Search Hotels',
    width: 480,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Destination</label>
          <input class="input" placeholder="e.g. Santorini, Greece">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Check-in</label>
            <input class="input" type="date">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Check-out</label>
            <input class="input" type="date">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Guests</label>
            <input class="input" type="number" value="2" min="1">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Budget (per night)</label>
            <select class="select" style="width:100%;">
              <option>Any</option><option>$500-1000</option><option>$1000-2000</option><option>$2000+</option>
            </select>
          </div>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Hotel Category</label>
          <select class="select" style="width:100%;">
            <option>Luxury (5-star)</option><option>Boutique</option><option>Resort</option><option>Villa/Private</option>
          </select>
        </div>
      </div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-hotels')" },
      { label: 'Search Hotels', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-hotels');showToast('Searching hotels...','info')" }
    ],
    id: 'dynamic-modal-hotels'
  });
}

function openAlertModal() {
  const clientOptions = (typeof CLIENTS !== 'undefined' ? CLIENTS : []).map(c =>
    `<option value="${c.id}">${c.name}</option>`
  ).join('');

  buildAndOpenModal({
    title: 'Create Flight Alert',
    width: 520,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Origin</label>
            <input class="input" placeholder="e.g. SFO">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Destination</label>
            <input class="input" placeholder="e.g. MLE">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Date Range Start</label>
            <input class="input" type="date">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Date Range End</label>
            <input class="input" type="date">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Cabin</label>
            <select class="select" style="width:100%;">
              <option>Business</option><option>First</option><option>Economy</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Max Points</label>
            <input class="input" type="number" placeholder="e.g. 85000">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Points Program</label>
            <select class="select" style="width:100%;">
              <option>Any</option><option>Singapore KrisFlyer</option><option>AA AAdvantage</option><option>AF Flying Blue</option><option>United MileagePlus</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Client</label>
            <select class="select" style="width:100%;">${clientOptions}</select>
          </div>
        </div>
      </div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-alert')" },
      { label: 'Create Alert', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-alert');showToast('Flight alert created','success')" }
    ],
    id: 'dynamic-modal-alert'
  });
}

function openTripModal(householdId) {
  const householdOptions = (typeof HOUSEHOLDS !== 'undefined' ? HOUSEHOLDS : []).map(h =>
    `<option value="${h.id}" ${h.id === householdId ? 'selected' : ''}>${h.name}</option>`
  ).join('');

  buildAndOpenModal({
    title: 'Create Trip',
    width: 520,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Trip Name</label>
          <input class="input" placeholder="e.g. Greece Island Hopping">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Household</label>
          <select class="select" style="width:100%;">${householdOptions}</select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Destinations</label>
          <input class="input" placeholder="e.g. Athens, Mykonos, Santorini">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Start Date</label>
            <input class="input" type="date">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">End Date</label>
            <input class="input" type="date">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Budget</label>
            <input class="input" type="text" placeholder="e.g. $25,000">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Trip Type</label>
            <select class="select" style="width:100%;">
              <option>Leisure</option><option>Anniversary</option><option>Family</option><option>Honeymoon</option><option>Adventure</option>
            </select>
          </div>
        </div>
      </div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-trip')" },
      { label: 'Create Trip', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-trip');showToast('Trip created','success')" }
    ],
    id: 'dynamic-modal-trip'
  });
}

function openBookingTypeModal(tripId) {
  buildAndOpenModal({
    title: 'Add Booking',
    width: 400,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div class="card p-3 cursor-pointer" style="border:1px solid var(--border);" onclick="closeDynamicModal('dynamic-modal-booktype');openFlightSearchModal()" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="display:flex;align-items:center;gap:10px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            <div><div style="font-weight:600;font-size:13px;color:var(--text-primary);">Flight</div><div style="font-size:11px;color:var(--text-muted);">Search and book award or cash flights</div></div>
          </div>
        </div>
        <div class="card p-3 cursor-pointer" style="border:1px solid var(--border);" onclick="closeDynamicModal('dynamic-modal-booktype');openHotelSearchModal()" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="display:flex;align-items:center;gap:10px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/></svg>
            <div><div style="font-weight:600;font-size:13px;color:var(--text-primary);">Hotel</div><div style="font-size:11px;color:var(--text-muted);">Search luxury hotels and resorts</div></div>
          </div>
        </div>
        <div class="card p-3 cursor-pointer" style="border:1px solid var(--border);" onclick="closeDynamicModal('dynamic-modal-booktype');showToast('Experience booking form coming soon','info')" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="display:flex;align-items:center;gap:10px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <div><div style="font-weight:600;font-size:13px;color:var(--text-primary);">Experience</div><div style="font-size:11px;color:var(--text-muted);">Tours, dining, activities</div></div>
          </div>
        </div>
        <div class="card p-3 cursor-pointer" style="border:1px solid var(--border);" onclick="closeDynamicModal('dynamic-modal-booktype');showToast('Transfer booking form coming soon','info')" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="display:flex;align-items:center;gap:10px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            <div><div style="font-weight:600;font-size:13px;color:var(--text-primary);">Transfer</div><div style="font-size:11px;color:var(--text-muted);">Airport transfers, car service</div></div>
          </div>
        </div>
      </div>
    `,
    buttons: [],
    id: 'dynamic-modal-booktype'
  });
}

function openAlertDetailModal(route, dates, cabin, maxPoints, program, clientName, status, triggered) {
  const statusColors = { 'Active': 'var(--success)', 'Triggered': 'var(--gold)', 'Paused': 'var(--text-muted)', 'Expired': 'var(--error)' };
  const sc = statusColors[status] || 'var(--text-muted)';
  buildAndOpenModal({
    title: 'Alert: ' + route,
    width: 460,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Route</div><div style="font-size:14px;font-weight:600;color:var(--text-primary);">${route}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Status</div><div><span class="badge" style="background:${sc}20;color:${sc};">${status}</span></div></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Dates</div><div style="font-size:13px;color:var(--text-primary);">${dates}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Cabin</div><div style="font-size:13px;color:var(--text-primary);">${cabin}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Max Points</div><div style="font-size:13px;font-weight:600;color:var(--text-primary);">${maxPoints}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Program</div><div style="font-size:13px;color:var(--text-primary);">${program}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Client</div><div style="font-size:13px;color:var(--text-primary);">${clientName}</div></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:2px;">Times Triggered</div><div style="font-size:14px;font-weight:600;color:var(--gold);">${triggered}</div></div>
        </div>
      </div>
    `,
    buttons: [
      { label: status === 'Paused' ? 'Resume' : 'Pause', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-alertdetail');showToast('Alert " + (status === 'Paused' ? 'resumed' : 'paused') + "','info')" },
      { label: 'Edit Alert', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-alertdetail');openAlertModal()" }
    ],
    id: 'dynamic-modal-alertdetail'
  });
}

function openReassignModal() {
  const agentOptions = (typeof AGENTS !== 'undefined' ? AGENTS : []).map(a =>
    `<div class="flex items-center gap-3 p-2.5 rounded cursor-pointer" style="border:1px solid var(--border);" onclick="closeDynamicModal('dynamic-modal-reassign');showToast('Task reassigned to ${a.name}','success');closeSlideOver('task-detail')" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
      <span class="avatar avatar-sm" style="background:${a.color};color:#fff;">${a.initials}</span>
      <span style="font-size:13px;font-weight:500;color:var(--text-primary);">${a.name}</span>
    </div>`
  ).join('');

  buildAndOpenModal({
    title: 'Reassign Task',
    width: 380,
    bodyHTML: `
      <div style="margin-bottom:8px;font-size:12px;color:var(--text-muted);">Select a team member to reassign this task to:</div>
      <div style="display:flex;flex-direction:column;gap:6px;">${agentOptions}</div>
    `,
    buttons: [],
    id: 'dynamic-modal-reassign'
  });
}

function openTravelerModal() {
  const clientOptions = (typeof CLIENTS !== 'undefined' ? CLIENTS : []).map(c =>
    `<label class="flex items-center gap-3 p-2 rounded cursor-pointer" style="border:1px solid var(--border);" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
      <input type="checkbox" style="accent-color:var(--gold);">
      <span class="avatar avatar-sm" style="background:${c.avatarColor};color:#fff;">${c.initials}</span>
      <div>
        <div style="font-size:13px;font-weight:500;color:var(--text-primary);">${c.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">${c.email}</div>
      </div>
    </label>`
  ).join('');

  buildAndOpenModal({
    title: 'Add Traveler',
    width: 440,
    bodyHTML: `
      <div style="margin-bottom:8px;font-size:12px;color:var(--text-muted);">Select clients to add as travelers:</div>
      <div style="display:flex;flex-direction:column;gap:6px;max-height:300px;overflow-y:auto;">${clientOptions}</div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-traveler')" },
      { label: 'Add Selected', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-traveler');showToast('Travelers added','success')" }
    ],
    id: 'dynamic-modal-traveler'
  });
}

function openNoteModal() {
  buildAndOpenModal({
    title: 'Add Note',
    width: 440,
    bodyHTML: `
      <div>
        <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Note</label>
        <textarea class="input" rows="4" placeholder="Add a note about this trip..."></textarea>
      </div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-note')" },
      { label: 'Save Note', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-note');showToast('Note added','success')" }
    ],
    id: 'dynamic-modal-note'
  });
}

function openPreferencesModal() {
  buildAndOpenModal({
    title: 'Edit Preferences',
    width: 520,
    bodyHTML: `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Dietary Requirements</label>
          <input class="input" value="No shellfish, vegetarian options preferred">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Room Preferences</label>
          <input class="input" value="High floor, king bed, ocean view when available">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Airline Preferences</label>
          <input class="input" value="Prefers business class, aisle seat, Singapore Airlines">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Special Occasions</label>
          <input class="input" value="Anniversary: June 15, Birthday: March 22">
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Notes</label>
          <textarea class="input" rows="3" placeholder="Additional preferences...">Prefers boutique hotels over large chains. Enjoys wine tastings and private tours.</textarea>
        </div>
      </div>
    `,
    buttons: [
      { label: 'Cancel', className: 'btn-ghost', onclick: "closeDynamicModal('dynamic-modal-prefs')" },
      { label: 'Save Preferences', className: 'btn-gold', onclick: "closeDynamicModal('dynamic-modal-prefs');showToast('Preferences updated','success')" }
    ],
    id: 'dynamic-modal-prefs'
  });
}

// ---- Render command palette HTML ----
function renderCommandPalette() {
  return `
    <div id="cmd-backdrop" class="modal-backdrop" onclick="toggleCommandPalette()"></div>
    <div id="cmd-palette" class="cmd-palette">
      <div style="padding:12px;border-bottom:1px solid var(--border);">
        <input class="input" placeholder="Search clients, trips, tasks... (Cmd+K)" style="border:none;font-size:14px;padding:4px 0;" autofocus>
      </div>
      <div style="padding:8px;max-height:320px;overflow-y:auto;">
        <div style="padding:4px 8px;font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;">Quick Actions</div>
        <div class="cmd-item" style="padding:8px 12px;border-radius:var(--radius);cursor:pointer;font-size:13px;display:flex;align-items:center;gap:10px;" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='transparent'">
          <span style="color:var(--text-muted);">+</span> <span>New Client</span> <span style="margin-left:auto;font-size:11px;color:var(--text-muted);">onboarding.html</span>
        </div>
        <div class="cmd-item" style="padding:8px 12px;border-radius:var(--radius);cursor:pointer;font-size:13px;display:flex;align-items:center;gap:10px;" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='transparent'">
          <span style="color:var(--text-muted);">+</span> <span>New Task</span>
        </div>
        <div style="padding:4px 8px;font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;margin-top:8px;">Recent Clients</div>
        ${CLIENTS.slice(0, 4).map(c => `
          <a href="client-detail?id=${c.id}" class="cmd-item" style="padding:8px 12px;border-radius:var(--radius);cursor:pointer;font-size:13px;display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--text-primary);" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='transparent'">
            <span class="avatar avatar-sm" style="background:${c.avatarColor};color:#fff;">${c.initials}</span>
            <span>${c.name}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}
