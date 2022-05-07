import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ height }) => {
    return (
        <div className='align-items-center d-flex justify-content-center' style={{ color: 'var(--main-color)', height: height }}>
            <div className='align-items-center d-flex'>
                <Spinner animation="border" />
                <h4 className='fw-bold ms-2 mb-0'>Loading...</h4>
            </div>
        </div>
    );
};

export default LoadingSpinner;