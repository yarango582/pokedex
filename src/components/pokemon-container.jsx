import React, {useState, useEffect} from 'react';
import Pokemon from './pokecard/pokemon';

function PokemonContainer(){

    const [pokemons, setPokemons] = useState({ hits: [], url: [] });

    const [page, setPage] = useState('');
    const [previousPage, setPreviousPage] = useState(null);

    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    

    useEffect(() =>{

        const getPokemons = async () => {

                try {
                    const results = await fetch(`${BASE_URL}?limit=10&offset=${page}`);
                    let pokedatos = results.json();

                    pokedatos.then((data) =>{
                        
                        setPokemons({hits: data.results});
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
        
        const results = await fetch(page);
        const data = results.json();
        
        data.then((pokemon) => {
            setPokemons({hits: pokemon.results})
            setPage(pokemon.next);
            setPreviousPage(pokemon.previous);
        })

        console.log(page);
    }

    const oldPage = async () => {

        if(previousPage !== null){
            
            const results = await fetch(previousPage);
            const data = results.json();

            data.then((pokemon) =>{
                setPokemons({hits: pokemon.results});
                setPage(pokemon.next);
                setPreviousPage(pokemon.previous);
            })

        }
    }


    return(
        <div className="pokemons-container">
            <h3>
                <div className="pokemons">
                    {
                        

                        pokemons.hits.map((pokedata) =>{
                            
                            return(

                                <Pokemon 
                                name={pokedata.name} 
                                key={pokedata.name}
                                url={pokedata.url}
                                />
                            )
                        })
                    }
                </div>
            </h3>
            <div className="pagination">
                <button type="button" className="btn-previous" onClick={oldPage}>Previous Page</button>
                <button type="button" className="btn-next" onClick={nextPage}>Next Page</button>
            </div>
        </div>
    )
}

export default PokemonContainer;
