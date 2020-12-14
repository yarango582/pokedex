import React, {useState} from 'react';
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

    const openCloseModal = () =>{
        setModal(!modal);
    }

    const body = (
        <div className={styles.modal}>
            <div className="content">
                <h2>title</h2>
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
            </Modal>
            <div className="container-button-open">
                <Button onClick={()=>openCloseModal()}>View details - {props.pokemonName}</Button>
            </div>
        </div>
    )
}
