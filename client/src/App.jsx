import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import About from './section/About';
import Edit from './section/Edit';
import Footer from './section/Footer';
import Home from './section/Home';
import Navbar from './section/Navbar';
import New from './section/New'; // Import your new component here
import View from './section/View';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="mt-[84px]"> {/* Adjust based on your navbar height */}
        <Routes>
          <Route path="/items" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/about" element={<About />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<View />} /> {/* View route with ID */}
        </Routes>
      </div>

      <Footer />
    </Router>

  )
}