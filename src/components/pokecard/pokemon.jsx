import React, {useState, useEffect} from 'react';
import './style.css';
import Details from '../modal/details';

function Pokemon (props){


    const [pokemonsDetails, setPokemonsDetails] = useState({ 
        hits: [], 
        img: [], 
        type: []
    });
    
    useEffect(() => {

        const getPokemonData = () =>{
            
            try {

                const urlPokeDetail = [];
                urlPokeDetail.push(props.url);
    
                urlPokeDetail.forEach( async (detail) => {
                    
                    const results = await fetch(detail);
                    const data = results.json();
                    data.then((x) => {
    
                        setPokemonsDetails({
                            hits: x, 
                            img: x.sprites.other.dream_world.front_default,
                            type: x.types
                        }); 
    
                    }).catch((e)=> console.log(e));
                    
                })  
    
            } catch (error) {
                console.log(error);
            }
        }
        getPokemonData();

    }, [props.url]);

    return(
        <div className="pokemon">
            <div className="pokecard-container" 
            id={
                pokemonsDetails.type.map((data) =>{
                    return(data.type.name)
                })
            }>
    
                <ul className="list-pokemons">
                    <li className="list-pokemons__item">
                    # {pokemonsDetails.hits.id}
                    </li>
                    <li className="list-pokemons__item">
                        Name: {props.name}
                    </li>
                    <li className="list-pokemons__item">
                        Height: {pokemonsDetails.hits.height}
                    </li>
                    <li className="list-pokemons__item">
                        Weight: {pokemonsDetails.hits.weight}
                    </li>
                    <li className="list-pokemons__item">
                        Types: {
                            pokemonsDetails.type.map((data, index) =>{
                                return(
                                    <span key={index}>
                                        <ul className="list-pokemons">
                                            <li className="list-pokemons__item">
                                            {data.type.name}
                                            </li>
                                        </ul>
                                    </span>
                                )
                            })
                        }
                    </li>
                </ul>
                <img className="pokeImagen" src={pokemonsDetails.img} alt={props.name}/>
            </div>
            <Details 
                pokemonName={props.name} 
                pokemonId={pokemonsDetails.hits.id}
                pokemonImage={pokemonsDetails.img}
                pokemonType={pokemonsDetails.type}
                pokemonData={pokemonsDetails.hits}
                pokemonExp={pokemonsDetails.hits.base_experience}
            />
        </div>
    )
}

export default Pokemon;