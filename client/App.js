import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Gallery from './pages/Gallery';
import './App.css';
import Battle from './pages/Battle';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/Battle' element={<Battle />} />
          <Route path='/Gallery' element={<Gallery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
