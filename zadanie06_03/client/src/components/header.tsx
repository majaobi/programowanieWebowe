import { Link } from 'react-router-dom'; // Import Link
import Navigation from './nav'; // Adjust the path as needed

const Header = () => {
  return (
    <header className="bg-pink-200 text-pink-900 text-center p-4">
      <h1 className="text-2xl mb-2">
        <Link to="/">Maja Obidzińska</Link>
      </h1>
      <Navigation />
    </header>
  );
};

export default Header;
