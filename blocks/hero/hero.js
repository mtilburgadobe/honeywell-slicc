export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cells = [...row.children];

  // Cell 0 = background image, Cell 1 = text content
  const bgCell = cells[0];
  const contentCell = cells[1];

  // Set up background image container
  bgCell.className = 'hero-bg';

  // Set up content container
  contentCell.className = 'hero-content';

  // Apply red class to span.red if present (for two-color heading)
  const redSpan = contentCell.querySelector('h1 span');
  if (redSpan) {
    redSpan.classList.add('red');
  }

  // Remove the row wrapper and move cells directly into the block
  block.innerHTML = '';
  block.append(bgCell, contentCell);
}
