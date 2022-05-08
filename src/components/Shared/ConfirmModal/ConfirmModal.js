import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmModal = ({ setYesDelete, setShowModal, showModal }) => {
    const handleDelete = () => {
        setYesDelete(true);
        setShowModal(false);
    };

    const handleCancel = () => {
        setYesDelete(false);
        setShowModal(false);
    };

    return (
        <div>
            <Modal show={showModal} aria-labelledby="confirmModal" centered>
                <Modal.Header><Modal.Title id="confirmModal">Asking for Confirmation!</Modal.Title></Modal.Header>
                <Modal.Body><p className='mb-0'>Do you really want to delete this item? There's no coming back once you confirm it.</p></Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCancel} variant="secondary" className='border-0 fw-bold'>Cancel</Button>
                    <Button onClick={handleDelete} variant="danger" className='border-0 fw-bold'>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ConfirmModal;