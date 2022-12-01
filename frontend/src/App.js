import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Reviews from './pages/reviews';
import Home from './pages/home';
import Insights from './pages/insights';
import Weather from './pages/weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/insights' element={<Insights />} />
        <Route path='/weather' element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
