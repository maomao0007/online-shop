function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="shadow-sm text-center bg-light py-3">
      <p className="mb-0">{year} @ Online Shop</p>
    </footer>
  );
}
export default Footer;
