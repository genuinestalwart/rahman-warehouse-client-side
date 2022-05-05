import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import './AddItem.css';

const AddItem = () => {
    return (
        <section className='d-flex justify-content-center py-5'>
            <div className='add-item-form-container'>
                <Form className='border px-5 py-4 rounded-3 shadow'>
                    <h2 className='fw-bold pb-3 text-center'>Add New Item</h2>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' />
                    </Form.Group>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Supplier</Form.Label>
                        <Form.Control type='text' placeholder='Enter supplier name' />
                    </Form.Group>

                    <Row className='my-3'>
                        <Form.Group as={Col}>
                            <Form.Label className='add-item-label'>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter price' />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className='add-item-label'>Quantity</Form.Label>
                            <Form.Control type='number' placeholder='Enter quantity' />
                        </Form.Group>
                    </Row>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Image</Form.Label>
                        <Form.Control type='url' placeholder='Enter url' />
                    </Form.Group>

                    <Form.Group className='my-3'>
                        <Form.Label className='add-item-label'>Description</Form.Label>
                        <Form.Control as='textarea' placeholder='Enter description' rows='5' />
                    </Form.Group>

                    <div className='d-flex justify-content-center pt-2'>
                        <Button className='add-item-button border-0 d-inline-block fw-bold w-50'>Add Item</Button>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default AddItem;