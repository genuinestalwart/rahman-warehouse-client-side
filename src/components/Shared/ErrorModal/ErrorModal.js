import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ErrorModal.css';

const ErrorModal = ({ error, setShowModal, showModal }) => {
    return (
        <div>
            <Modal show={showModal} aria-labelledby="errorModal" centered>
                <Modal.Header><Modal.Title id="errorModal">{error.header}</Modal.Title></Modal.Header>
                <Modal.Body><p>{error.body}</p></Modal.Body>
                <Modal.Footer><Button className='border-0 fw-bold modal-button' onClick={() => setShowModal(false)}>Okay</Button></Modal.Footer>
            </Modal>
        </div>
    );
};

export default ErrorModal;