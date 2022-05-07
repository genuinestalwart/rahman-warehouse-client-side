import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Item from '../Item/Item';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import './Inventory.css';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        fetch(`http://localhost:5000/inventory`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            });
    }, []);

    return (
        <section className='inventory'>
            <div className='add-new-item my-5 text-center'><Link className='link fw-bold p-2 rounded-3 text-decoration-none' to='/add-item' state={{ from: location }}>Add New Item</Link></div>

            {
                loading ?
                    <LoadingSpinner height='calc(100vh - 4rem)'></LoadingSpinner>
                    : <Table className='my-5' striped hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map(item => <Item key={item._id} item={item} index={items.indexOf(item)}></Item>)
                            }
                        </tbody>
                    </Table>
            }
        </section>
    );
};

export default Inventory;