export default async function decorate(block) {
  const rows = [...block.children];
  // Row 3 (index 2) contains the accordion items
  const itemsRow = rows[2];
  if (!itemsRow) return;

  const items = [...itemsRow.children];
  items.forEach((item) => {
    item.addEventListener('click', () => {
      // Close other items
      items.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      // Toggle this item
      item.classList.toggle('open');
    });
  });
}
