export default async function decorate(block) {
  const rows = [...block.children];

  // Build the layout container
  const layout = document.createElement('div');
  layout.className = 'wwd-layout';

  // Build the navigation
  const nav = document.createElement('ul');
  nav.className = 'wwd-nav';
  nav.setAttribute('role', 'tablist');

  // Build the content area
  const content = document.createElement('div');
  content.className = 'wwd-content';

  rows.forEach((row, index) => {
    const cells = [...row.children];
    // Cell 0: tab label text
    // Cell 1: background image
    // Cell 2: heading + description + CTA

    const label = cells[0]?.textContent?.trim() || `Tab ${index + 1}`;
    const imgEl = cells[1]?.querySelector('img');
    const textCell = cells[2];

    // Create nav button
    const li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    btn.setAttribute('aria-controls', `wwd-panel-${index}`);
    btn.textContent = label;
    li.appendChild(btn);
    nav.appendChild(li);

    // Create content panel
    const panel = document.createElement('div');
    panel.className = `wwd-panel${index === 0 ? ' active' : ''}`;
    panel.id = `wwd-panel-${index}`;
    panel.setAttribute('role', 'tabpanel');

    // Place the image as background
    if (imgEl) {
      panel.style.backgroundImage = `url('${imgEl.src}')`;
    }

    // Build text overlay
    if (textCell) {
      const textDiv = document.createElement('div');
      textDiv.className = 'wwd-panel-text';
      textDiv.innerHTML = textCell.innerHTML;
      panel.appendChild(textDiv);
    }

    content.appendChild(panel);
  });

  // Wire up tab switching
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('button[role="tab"]');
    if (!btn) return;

    // Deselect all
    nav.querySelectorAll('button[role="tab"]').forEach((b) => {
      b.setAttribute('aria-selected', 'false');
    });
    content.querySelectorAll('.wwd-panel').forEach((p) => {
      p.classList.remove('active');
    });

    // Select clicked
    btn.setAttribute('aria-selected', 'true');
    const panelId = btn.getAttribute('aria-controls');
    const targetPanel = content.querySelector(`#${panelId}`);
    if (targetPanel) targetPanel.classList.add('active');
  });

  layout.appendChild(nav);
  layout.appendChild(content);

  // Replace block content
  block.textContent = '';
  block.appendChild(layout);
}
