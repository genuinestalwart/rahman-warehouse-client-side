import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Item from '../Item/Item';
import ConfirmModal from '../Shared/ConfirmModal/ConfirmModal';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import './Inventory.css';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [yesDelete, setYesDelete] = useState(false);
    const [itemId, setItemId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
        fetch(`https://rahman-warehouse-backend.herokuapp.com/inventory`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            });

        if (yesDelete) {
            fetch('https://rahman-warehouse-backend.herokuapp.com/delete-item', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ itemId })
            })
                .then(res => res.json())
                .then(() => {
                    const newItems = items.filter(el => el._id !== itemId);
                    setItems(newItems);
                });
        }
    }, [yesDelete, itemId]);

    return (
        <section className='inventory'>
            <div className='add-new-item my-5 text-center'><Link className='link fw-bold p-2 rounded-3 text-decoration-none' to='/add-item' state={{ from: location }}>Add New Item</Link></div>

            {
                loading ?
                    <LoadingSpinner height='calc(100vh - 4rem)'></LoadingSpinner>
                    : items.length ?
                        <Table className='my-5' striped hover>
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
                                    items.map(item => <Item key={item._id} item={item} index={items.indexOf(item)} setYesDelete={setYesDelete} setItemId={setItemId} setShowModal={setShowModal}></Item>)
                                }
                            </tbody>
                        </Table>
                        : <div className='align-items-center d-flex justify-content-center' style={{ color: 'var(--main-color)', height: 'calc(100vh - 4rem)' }}>
                            <h4 className='fw-bold mb-0'>No Item Found!</h4>
                        </div>
            }

            <ConfirmModal setYesDelete={setYesDelete} setShowModal={setShowModal} showModal={showModal}></ConfirmModal>
        </section>
    );
};

export default Inventory;