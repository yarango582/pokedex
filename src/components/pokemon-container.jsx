import React, {useState, useEffect, useCallback} from 'react';
import Pokecard from './pokecard/pokemon';
import './style.css';

function PokemonContainer(props){

    const [pokemons, setPokemons] = useState({ hits: [], url: [] });
    const [page, setPage] = useState('');
    const [previousPage, setPreviousPage] = useState(null);
    const [searchPokemon, setSearchPokemon] = useState('');

    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    
    
    const getPokemons = useCallback( async() =>{
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
    }, [page]);

    const getPokemonSearch = useCallback( async () =>{

        let dataSearch = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118`;

        try {
            
            const results = await fetch(dataSearch);
            const pokeData = results.json();

            pokeData.then((data) =>{
                
                data.results.forEach((poke) =>{
                    
                    let pokemonResult = [];
                    pokemonResult.push(poke);
                    if(poke.name === searchPokemon){
                        
                        setPokemons({hits: pokemonResult});
                    }
                });

            }).catch((wrong) =>{
                console.log(wrong);
            })

        } catch (error) {
            console.log(error);
        }
    }, [searchPokemon])

    const nextPage = async () =>{        
        
        const results = await fetch(page);
        const data = results.json();
        
        data.then((pokemon) => {
            setPokemons({hits: pokemon.results})
            setPage(pokemon.next);
            setPreviousPage(pokemon.previous);
        })
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

    useEffect(() => {

        /*Updates*/
        setSearchPokemon(props.searchPokemon.toLowerCase());

        if(pokemons.hits.length < 1){
            getPokemons();
        }
        
        if(searchPokemon === ''){
            if(pokemons.hits.length <= 1){
                getPokemons();
            }
        }else if(searchPokemon !== ''){
            getPokemonSearch();
        }

    }, [props.searchPokemon,searchPokemon, getPokemons, getPokemonSearch,pokemons.hits.length])

    return(
        <div className="pokemons-container">
            <h3>
                <div className="pokemons">
                    {
                        pokemons.hits.map((pokedata) =>{       
                            return(
                                <Pokecard 
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
