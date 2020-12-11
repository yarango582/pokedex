import React, {useState} from 'react';
import './style.css';

function Pokemon (props){

    return(
        <div className="pokemon">
            <div className="pokecard-container">
                <p>
                    {props.name}
                </p>
            </div>
        </div>
    )
}

export default Pokemon;