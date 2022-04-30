import React from 'react';
import './Header.css';
import logo from '../../../images/logo.png';
import { Nav, Navbar } from 'react-bootstrap';
import CustomLink from '../CustomLink/CustomLink';

const Header = () => {
    const style = { backgroundColor: '#C2F9BB', padding: '0.75rem 0' };

    return (
        <header className='align-items-center d-flex header justify-content-between'>
            <div className='align-items-center d-flex h-75'>
                <div className='h-100'><img className='h-100' src={logo} alt="logo" /></div>
                <h1 className='fw-bold m-0'>Rahman Warehouse</h1>
            </div>

            <Navbar className='d-flex h-100 justify-content-end py-0' collapseOnSelect expand="md">
                <div className='align-items-center d-flex h-100 pe-2'><Navbar.Toggle className='p-2 toggle-btn' aria-controls="responsive-navbar-nav" /></div>
                <Navbar.Collapse className='h-100' id="responsive-navbar-nav">
                    <Nav className='d-flex h-100 w-100'>
                        <Nav.Link style={style} as={CustomLink} to='/'>Home</Nav.Link>
                        <Nav.Link style={style} as={CustomLink} to='/inventory'>Inventory</Nav.Link>
                        <Nav.Link style={style} as={CustomLink} to='/blogs'>Blogs</Nav.Link>
                        <Nav.Link style={style} as={CustomLink} to='/add-item'>Add Item</Nav.Link>
                        <Nav.Link style={style} as={CustomLink} to='/my-items'>My Items</Nav.Link>
                        <Nav.Link style={style} as={CustomLink} to='/login'>Log in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </header>
    );
};

export default Header;