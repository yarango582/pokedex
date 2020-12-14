import React from 'react';
import './style.css';

function Navbar (props){

    return(
        <div className="navbar">
            <nav className="navigation">
                <img 
                    className="logo-p"
                    src="https://www.flaticon.es/svg/static/icons/svg/188/188918.svg" 
                    alt="logo"
                    />  
            <form className="form-search-bar">
                <input type="text" name="search" placeholder="Search Pokemon" className="search-bar" onChange={props.handleInput}/>
            </form>
            </nav>
            <h3 className="title">Pokedex</h3>
        </div>
    )

}

export default Navbar;