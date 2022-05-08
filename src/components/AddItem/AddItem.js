import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useFirebase from '../../hooks/useFirebase';
import ErrorModal from '../Shared/ErrorModal/ErrorModal';
import './AddItem.css';

const AddItem = ({ setInfo, setShowToast }) => {
    const {
        errObj, setErrObj,
        showModal, setShowModal
    } = useFirebase();
    const [user] = useAuthState(auth);
    const [name, setName] = useState('');
    const [supplier, setSupplier] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const handleInput = (e, type, setTo) => {
        const value = type ? e.target.value : parseInt(e.target.value);

        if (!isNaN(value) || value) {
            setTo(value);
        }
    };

    const checkIfValidURL = (link) => {
        try {
            const { href, protocol } = new URL(link);
            return (protocol === "http:" || protocol === "https:") && (href.endsWith('.jpg') || href.endsWith('.jpeg') || href.endsWith('.png') || href.endsWith('.svg') || href.endsWith('.webp'));
        } catch (error) {
            return false;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name && supplier && price && price > 0 && quantity && quantity > 0 && image && checkIfValidURL(image) && description) {
            const newItem = {
                name, supplier,
                price, quantity,
                image, description,
                email: user.email
            };

            fetch('https://rahman-warehouse-backend.herokuapp.com/add-item', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(newItem)
            })
                .then(res => res.json())
                .then(({ header, body }) => {
                    setInfo({
                        header,
                        body
                    });
                    setShowToast(true);
                });
        } else {
            setErrObj({
                header: 'Invalid Inputs!',
                body: 'Please enter some valid data.'
            });
            setShowModal(true);
        }
    };

    return (
        <section className='d-flex justify-content-center py-5'>
            <div className='add-item-form-container'>
                <Form className='border px-5 py-4 rounded-3 shadow'>
                    <h2 className='fw-bold pb-3 text-center'>Add New Item</h2>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Name</Form.Label>
                        <Form.Control onBlur={(e) => handleInput(e, true, setName)} type='text' placeholder='Enter name' />
                    </Form.Group>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Supplier</Form.Label>
                        <Form.Control onBlur={(e) => handleInput(e, true, setSupplier)} type='text' placeholder='Enter supplier name' />
                    </Form.Group>

                    <Row className='my-3'>
                        <Form.Group as={Col}>
                            <Form.Label className='add-item-label'>Price</Form.Label>
                            <Form.Control onBlur={(e) => handleInput(e, false, setPrice)} type='number' placeholder='Enter price' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className='add-item-label'>Quantity</Form.Label>
                            <Form.Control onBlur={(e) => handleInput(e, false, setQuantity)} type='number' placeholder='Enter quantity' />
                        </Form.Group>
                    </Row>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Image</Form.Label>
                        <Form.Control onBlur={(e) => handleInput(e, true, setImage)} type='url' placeholder='Enter url' />
                    </Form.Group>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Description</Form.Label>
                        <Form.Control onBlur={(e) => handleInput(e, true, setDescription)} as='textarea' placeholder='Enter description' rows='5' />
                    </Form.Group>

                    <div className='d-flex justify-content-center pt-2'>
                        <Button onClick={handleSubmit} type='submit' className='add-item-button border-0 d-inline-block fw-bold w-50'>Add Item</Button>
                    </div>
                </Form>
            </div>

            <ErrorModal error={errObj} setShowModal={setShowModal} showModal={showModal}></ErrorModal>
        </section>
    );
};

export default AddItem;