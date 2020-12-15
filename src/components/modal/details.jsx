import React, {useState, useEffect} from 'react';
import {Modal, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import './style.css';

const useStyle = makeStyles({
    modal:{
        position: 'absolute',
        width: '400px',
        background: 'white',
        border: '2px solid #000',
        boxShadow: '10px 5px 5px black',
        padding: '10px 10px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'scroll',
    },
    field:{
        width: '100%',
    },
    buttonOpen:{
        textAlign:'center',
    }
})

export default function Details (props){

    const styles = useStyle();
    const [modal, setModal] = useState(false);
    const [pokeData, setPokeData] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const openCloseModal = () =>{
        setModal(!modal);
    }

    useEffect(() => {

        if(modal){
            setPokeData(props.pokemonData);
            if(pokeData.abilities !== undefined){
                setAbilities(pokeData.abilities)
            }
        }
        
    }, [modal, props.pokemonData, abilities, pokeData.abilities])

 

    const body = (
        <div className={styles.modal}>
            <div className="content-title">
                <h2>#{props.pokemonId}</h2>
            </div>
            <div className="content">
                <h3>{props.pokemonName}</h3>
            </div>
            <div className="container-pokemonTypes">

                    {
                        props.pokemonType.map((data, index)=>{
                            return(
                                <ul 
                                className="pokemonType-list"
                                key={index}
                                >
                                <li 
                                className="pokemonType-list__item"
                                >
                                    {data.type.name}
                                </li>
                                </ul>
                            )
                        })
                    }
            </div>
            <div className="container-pokemonAbilities">
                <h4>Skills: </h4>
                <ul>
                {
                    abilities.map((poke, index) =>{
                        return(
                            <li key={index}>
                                {poke.ability.name}
                            </li>
                        )
                    })
                }
                </ul>
            </div>
            <div className="container-pokemonInfoBasic">
                <h4>Information: </h4>
                <div>
                    <ul>
                        <li>
                            Height: {props.pokemonHeight}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container-img">
                <figure>
                    <img src={props.pokemonImage} alt="pokemonImage"/>
                </figure>
            </div>
            <div className="container-button-close">
                <Button 
                    className={styles.buttonOpen}
                    onClick={()=>openCloseModal()}
                > Close
                </Button>
            </div>
        </div>
    );

    return(
        <div className="pokemonDetails">
            <Modal 
                open={modal}
                onClose={openCloseModal}
            > 
                {body}
                {}
            </Modal>
            <div className="container-button-open">
                <Button onClick={()=>openCloseModal()}>View details - {props.pokemonName}</Button>
            </div>
        </div>
    )
}
