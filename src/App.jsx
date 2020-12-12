import logo from './logo.svg';
import './App.css';
import Pokemons from './components/pokemon-container';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Pokemons />
      </div>
    </div>
  );
}

export default App;
