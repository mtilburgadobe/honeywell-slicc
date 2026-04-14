export default async function decorate(block) {
  // The block has 3 rows:
  // Row 1: first set of link columns (Businesses, Solutions, Industries, Customer)
  // Row 2: second set of link columns (Company, News, Careers, Contact, Follow Us)
  // Row 3: bottom bar (copyright + legal links)
  const rows = [...block.children];

  // Mark the bottom bar row
  if (rows.length >= 3) {
    rows[rows.length - 1].classList.add('footer-bottom');
  }
}
