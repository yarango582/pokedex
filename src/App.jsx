import React, {useState} from 'react';
import './App.css';
import Pokemons from './components/pokemon-container';
import Navbar from './components/navbar/navbar';

function App() {

  const [search, setSearch] = useState('');

  const handleInput = (e) =>{

    const dataSearch = e.target.value;
    setSearch(dataSearch);

  }

  return (
    <div className="App">
      <Navbar handleInput={handleInput}/>
      <div className="container">
        <Pokemons searchPokemon={search}/>
      </div>
    </div>
  );
}

export default App;
