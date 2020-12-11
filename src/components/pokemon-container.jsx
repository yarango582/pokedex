import React, {useState, useEffect} from 'react';
import Pokemon from './pokecard/pokemon';

function PokemonContainer(){

    const [pokemons, setPokemons] = useState([]);

    useEffect(() =>{

        const getPokemonForName = async () => {

            let pokedatos = '';
            try {
                let results = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`);
                pokedatos = await results.json();
            } catch (error) {
                console.log(error);
            }
            return pokedatos.results;
        }

        getPokemonForName().then((pokeresultado) =>{
            setPokemons(pokeresultado);
            console.log(pokeresultado);
        })
       
    }, []);


    return(
        <div className="pokemons-container">
            <h1>
                {pokemons.map((pokemon) =>{
                    return(
                    <Pokemon key={pokemon.name} name={pokemon.name} />
                    )
                })}
            </h1>
        </div>
    )
}

export default PokemonContainer;
