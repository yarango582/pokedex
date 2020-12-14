import React from 'react';
import 'react-simple-hook-modal/dist/styles.css';
import './style.css';

import {
    ModalProvider,
    Modal,
    useModal,
    ModalTransition
} from 'react-simple-hook-modal';

function Details (props){


    const {isModalOpen, openModal, closeModal} = useModal();

    return(
        <ModalProvider>
            <button onClick={openModal} className="button-details">See details -
            {` ${props.pokemonName}`}
            </button>
            <Modal 
                id="1"
                isOpen={isModalOpen}
                transition={ModalTransition.BOTTOM_UP}
            >
                <button onClick={closeModal}>Close</button>
            </Modal>
        </ModalProvider>
    )

}

export default Details;