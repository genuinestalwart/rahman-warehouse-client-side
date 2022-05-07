import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import './InformToast.css';

const InformToast = ({ info, showToast, setShowToast }) => {
    return (
        <div aria-live="polite" aria-atomic="true">
            <ToastContainer className='pe-5' position="middle-end">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header className='inform-toast-header justify-content-between'><h5 className='mb-0'>{info}</h5></Toast.Header>
                    <Toast.Body className='inform-toast-body'><p className='mb-0'>Mail has been sent. Don't forget to check your spam folder.</p></Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default InformToast;