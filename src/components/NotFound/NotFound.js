import React from 'react';
import { Link } from 'react-router-dom';
import error404 from '../../images/error404.jpg';
import './NotFound.css';

const NotFound = () => {
    return (
        <section className='d-flex justify-content-center'>
            <div>
                <h2 className='fw-bold py-4 text-center' style={{ color: 'var(--main-color)' }}>Page Not Found!</h2>
                <div><img className='w-100' src={error404} alt="error 404" /></div>
                <div className='back-to-home py-5 text-center'><Link className='link fw-bold p-2 rounded-3 text-decoration-none' to='/'>Back to Home Page</Link></div>
            </div>
        </section>
    );
};

export default NotFound;