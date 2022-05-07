import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import HomeItem from '../HomeItem/HomeItem';
import './HomeItems.css';

const HomeItems = () => {
    const [items, setItems] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetch('http://localhost:5000/inventory?start=1')
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);

    return (
        <section>
            <h2 className='fw-bold my-5 text-center'>Inventory</h2>

            <Container className='items-container' fluid>
                <Row className='g-5' xs={1} md={3}>
                    {
                        items.map(item => <HomeItem key={item._id} homeItem={item}></HomeItem>)
                    }
                </Row>
            </Container>

            <div className='manage-inventory py-5 text-center'><Link className='link fw-bold p-2 rounded-3 text-decoration-none' to='/manage-inventory' state={{ from: location }}>Manage Inventories</Link></div>
        </section>
    );
};

export default HomeItems;