import logo from './logo.png';
import './App.css';
import Attributes from './components/attributes';
import Footer from './components/footer';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Help with Yelp</h1>
        <Attributes />
        <Footer />
      </header>
    </div>
  );
}

export default App;
