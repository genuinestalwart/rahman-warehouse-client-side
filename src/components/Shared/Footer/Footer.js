import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className='footer text-center'>
            <div className='my-3'>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faFacebook}></FontAwesomeIcon>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faInstagram}></FontAwesomeIcon>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faTwitter}></FontAwesomeIcon>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faLinkedin}></FontAwesomeIcon>
            </div>
            <p className='fw-bold'>&copy;2022 <span>Rahman Warehouse</span>, all rights reserved.</p>
        </footer>
    );
};

export default Footer;