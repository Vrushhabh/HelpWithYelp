import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Reviews from './pages/reviews';
import Home from './pages/home';
import Insights from './pages/insights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/insights' element={<Insights />} />
      </Routes>
    </Router>
  );
}

export default App;
