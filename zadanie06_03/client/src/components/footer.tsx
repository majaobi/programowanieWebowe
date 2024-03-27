// Footer.js
const Footer = () => {
  const year = new Date().getFullYear(); // Gets the current year

  return (
    <footer className="bg-pink-200 text-pink-900 text-center p-4 mt-8">
      <p>© {year} Maja Obidzińska, Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
