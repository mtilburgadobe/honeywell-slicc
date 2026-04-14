export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const row = rows[0];
  const cells = [...row.children];

  // Cell 0: background image; Cell 1: text content card
  const imgCell = cells[0];
  const textCell = cells[1];

  // Set up background image from the image cell
  if (imgCell) {
    const picture = imgCell.querySelector('picture');
    if (picture) {
      imgCell.className = 'cta-banner-bg';
    }
  }

  // Set up the card overlay from the text cell
  if (textCell) {
    textCell.className = 'cta-banner-card';
  }

  // Remove the row wrapper and promote cells directly into block
  block.innerHTML = '';
  if (imgCell) block.append(imgCell);
  if (textCell) block.append(textCell);
}
