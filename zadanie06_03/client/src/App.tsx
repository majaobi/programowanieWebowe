import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Users from './components/users';
import Profiles from './components/profiles';
import Posts from './components/posts';
import Comments from './components/comments';
import Tags from './components/tags';
import NotFound from './components/notfound';
import Home from './components/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
