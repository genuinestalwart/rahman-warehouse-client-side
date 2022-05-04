import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import './ItemInfo.css';
import { Link, useParams } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';


const ItemInfo = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});

    useEffect(() => {
        if (id.length === 24) {
            fetch(`http://localhost:5000/inventory/?search_id=${id}`)
                .then(res => res.json())
                .then(data => setItem(data));
        }
    }, [id]);

    if (id.length !== 24 || !Object.keys(item).length) {
        return <NotFound></NotFound>;
    }

    const { _id, name, image, supplier, price, quantity, description } = item;

    return (
        <section className='d-flex justify-content-center py-4'>
            <div className='h-75 my-4 w-75'>
                <Row className='gx-5' xs={1} md={3}>
                    <Col>
                        <Card className='h-100 rounded-3 shadow'>
                            <div className='align-items-center d-flex h-100 justify-content-center'><Card.Img className='w-75' src={image} /></div>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='h-100 rounded-3 shadow'>
                            <div className='align-items-center d-flex h-100'>
                                <Card.Body>
                                    <Card.Title className='mt-2 mb-4'>{name}</Card.Title>
                                    <div>
                                        <p className='my-2'><span>ID:</span> {_id}</p>
                                        <p className='my-2'><span>Suplier:</span> {supplier}</p>
                                        <p className='my-2'><span>Price:</span> ${price}</p>
                                        <p className='my-2'><span>Description:</span> {description}</p>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='h-100 rounded-3 shadow'>
                            <div className='align-items-center d-flex h-100'>
                                <Card.Body>
                                    <div className='align-items-center d-flex justify-content-between my-2'>
                                        <p className='mb-0'><span>Quantity:</span> {quantity}</p>
                                        <Button className='border-0 deliver-button fw-bold rounded-3'>Delivered</Button>
                                    </div>

                                    <Form className='my-3'>
                                        <Form.Group>
                                            <Form.Label className='fw-bold restock-label'>Restock the Item</Form.Label>
                                            <Form.Control type="number" placeholder="Enter the amount" />
                                        </Form.Group>

                                        <div className='text-center'><Button className='border-0 fw-bold my-3 restock-button rounded-3'>restock</Button></div>
                                    </Form>

                                    <div className='manage-inventory text-center'><Link className='d-inline-block link fw-bold p-2 rounded-3 text-decoration-none' to='/manage-inventory'>Manage Inventories</Link></div>
                                </Card.Body>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    );
};

export default ItemInfo;