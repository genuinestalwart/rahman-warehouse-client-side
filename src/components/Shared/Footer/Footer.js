import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className='footer text-center'>
            <div>
                <Link className='link p-2' to='/inventory'>Inventory</Link>
                <Link className='link p-2' to='/blogs'>Blogs</Link>
                <Link className='link p-2' to='/login'>Log in</Link>
            </div>
            <div className='my-3'>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faFacebook}></FontAwesomeIcon>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faInstagram}></FontAwesomeIcon>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faTwitter}></FontAwesomeIcon>
                <FontAwesomeIcon className='d-inline-block fa-icon m-2 p-2 rounded-circle' icon={faLinkedin}></FontAwesomeIcon>
            </div>
            <p className='fw-bold mb-0'>&copy;2022 <span>Rahman Warehouse</span>, all rights reserved.</p>
        </footer>
    );
};

export default Footer;