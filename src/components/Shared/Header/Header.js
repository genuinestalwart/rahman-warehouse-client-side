import React from 'react';
import './Header.css';
import logo from '../../../images/logo.png';
import { Nav, Navbar } from 'react-bootstrap';
import CustomLink from '../CustomLink/CustomLink';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import { useLocation } from 'react-router-dom';

const Header = ({ user }) => {
    const style = { backgroundColor: 'var(--main-color)', padding: '0.75rem 0' };
    const location = useLocation();

    const logOut = () => {
        signOut(auth);
    };

    return (
        <header className='align-items-center d-flex header justify-content-between'>
            <div className='align-items-center d-flex h-75'>
                <div className='h-100'><img className='h-100' src={logo} alt="logo" /></div>
                <h1 className='fw-bold m-0'>Rahman Warehouse</h1>
            </div>

            <Navbar className='d-flex h-100 justify-content-start py-0' collapseOnSelect expand="md">
                <div className='align-items-center d-flex h-100 pe-2'><Navbar.Toggle className='p-2 toggle-btn' aria-controls="responsive-navbar-nav" /></div>
                <Navbar.Collapse className='h-100' id="responsive-navbar-nav">
                    {
                        user ?
                            <Nav className='d-flex h-100 w-100'>
                                <Nav.Link style={style} as={CustomLink} to='/' state={{ from: location }}>Home</Nav.Link>
                                <Nav.Link style={style} as={CustomLink} to='/blogs' state={{ from: location }}>Blogs</Nav.Link>
                                <Nav.Link style={style} as={CustomLink} to='/manage-inventory' state={{ from: location }}>Inventory</Nav.Link>
                                <Nav.Link style={style} as={CustomLink} to='/add-item' state={{ from: location }}>Add Item</Nav.Link>
                                <Nav.Link style={style} as={CustomLink} to='/my-items' state={{ from: location }}>My Items</Nav.Link>
                                <button onClick={logOut} className='bg-transparent border-0 logout-button'>Log out</button>
                            </Nav>
                            :
                            <Nav className='d-flex h-100 w-100'>
                                <Nav.Link style={style} as={CustomLink} to='/' state={{ from: location }}>Home</Nav.Link>
                                <Nav.Link style={style} as={CustomLink} to='/blogs' state={{ from: location }}>Blogs</Nav.Link>
                                <Nav.Link style={style} as={CustomLink} to='/login' state={{ from: location }}>Log in</Nav.Link>
                                <Nav.Link style={style} as={CustomLink} to='/register' state={{ from: location }}>Register</Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>

        </header>
    );
};

export default Header;