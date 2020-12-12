import React, {useState, useEffect} from 'react';
import './style.css';

function Pokemon (props){

    const urlPokeDetail = [];
    const [pokemonsDetails, setPokemonsDetails] = useState({ 
        hits: [], 
        img: [], 
        type: []
    });
    let color = '';

    useEffect(() => {

        try {

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

    }, []);
    
    const defineColor = () =>{

        console.log(document.getElementsByClassName('pokecard-container'));

    }

    defineColor();

    return(
        <div className="pokemon">
            <div className="pokecard-container" 
            id={
                pokemonsDetails.type.map((data) =>{
                    return(
                        
                        color = [data.type.name]
                        
                    )
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
                            pokemonsDetails.type.map((data) =>{
                                return(
                                    data.type.name + ' '
                                )
                            })

                        }
                    </li>
                </ul>
                <img className="pokeImagen" src={pokemonsDetails.img} alt={props.name}/>
            </div>
        </div>
    )
}

export default Pokemon;