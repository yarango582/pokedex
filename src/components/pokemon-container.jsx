import React, {useState, useEffect} from 'react';
import Pokemon from './pokecard/pokemon';

function PokemonContainer(){

    const  default_directory = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState('');

    useEffect(() =>{

        const getPokemons = async () => {

                try {
                    const results = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`);
                    let pokedatos = results.json();

                    pokedatos.then((data) =>{
                        setPokemons(data.results);
                        setPage(data.next);
                    }).catch((e)=>{
                        console.log(e);
                    })

                } catch (error) {
                    console.log(error);
                }
                
        }

        getPokemons();
    
    }, []);

    const nextPage = async () =>{

        try {
            const results = await fetch(page);
            let newPage = results.json();

            newPage.then((data) =>{
               setPokemons(data.results);
               setPage(data.next);
               console.log(page);
            }).catch((e) =>{
                console.log(e);
            })

        } catch (error) {
            console.log(error);
        }

    }

    const previousPage = async () => {

       

        try {
            const results = await fetch(page);
            let newPage = results.json();

            newPage.then((data) =>{
                console.log(data);
                setPage(data.previous);
                console.log(page)

            }).catch((e) =>{
                console.log(e);
            })

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="pokemons-container">
            <h3>
                {pokemons.map((pokemon) =>{
                    return(
                    <Pokemon key={pokemon.name} name={pokemon.name} />
                    )
                })}
            </h3>
            <div className="pagination">
                <button type="button" onClick={previousPage}>Previous Page</button>
                <button type="button" onClick={nextPage}>Next Page</button>
            </div>
        </div>
    )
}

export default PokemonContainer;
