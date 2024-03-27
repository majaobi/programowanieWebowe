import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="text-pink-600">
      <ul className="flex space-x-4 justify-center">
        <li><Link to="/users" className="hover:text-pink-800">Users</Link></li>
        <li><Link to="/profiles" className="hover:text-pink-800">Profiles</Link></li>
        <li><Link to="/posts" className="hover:text-pink-800">Posts</Link></li>
        <li><Link to="/comments" className="hover:text-pink-800">Comments</Link></li>
        <li><Link to="/tags" className="hover:text-pink-800">Tags</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
