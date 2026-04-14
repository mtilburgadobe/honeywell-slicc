export default async function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('div');
    card.className = 'card';

    // Cell 0: image, Cell 1: text (heading + link)
    cells.forEach((cell) => {
      card.append(...cell.childNodes);
    });

    grid.append(card);
  });

  block.textContent = '';
  block.append(grid);
}
