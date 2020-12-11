import React, {useState} from 'react';
import './style.css';

function Pokemon (props){

    return(
        <div className="pokemon">
            <p>
                {props.name}
            </p>
        </div>
    )
}

export default Pokemon;