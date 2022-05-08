import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import './ItemInfo.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';


const ItemInfo = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [restock, setRestock] = useState(0);
    const [loading, setLoading] = useState(true);
    const [qLoading, setQLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (id.length === 24) {
            fetch(`https://rahman-warehouse-backend.herokuapp.com/inventory/?search_id=${id}`)
                .then(res => res.json())
                .then(data => {
                    setItem(data);
                    setQuantity(item.quantity);
                    setLoading(false);
                });
        }
    }, [id, item]);

    const { _id, name, image, supplier, price, description } = item;

    const handleFetch = (increaseBy) => {
        const itemData = { _id, increaseBy };
        setQLoading(true);
        fetch(`https://rahman-warehouse-backend.herokuapp.com/change-quantity`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(itemData)
        })
            .then(res => res.json())
            .then(() => {
                setQLoading(false);
            });
    };

    const handleDeliver = () => {
        if (quantity) {
            setQuantity(quantity - 1);
            handleFetch(-1);
        }
    };

    const handleRestock = () => {
        if (!isNaN(parseInt(restock)) && parseInt(restock) > 0) {
            setQuantity(quantity + parseInt(restock));
            handleFetch(restock);
        }
    };

    return (
        <section>
            {
                loading ?
                    <LoadingSpinner height='calc(100vh - 4rem)'></LoadingSpinner>
                    : id.length !== 24 || !Object.keys(item).length ?
                        <NotFound></NotFound>
                        : <div className='d-flex justify-content-center py-4'>
                            <div className='h-75 my-4 w-75'>
                                <Row className='g-5' xs={1} md={3}>
                                    <Col>
                                        <Card className='h-100 rounded-3 shadow'>
                                            <div className='align-items-center d-flex h-100 item-info-image justify-content-center'><Card.Img className='w-75' src={image} /></div>
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
                                                        <div><span>Quantity:</span> {
                                                            qLoading ?
                                                                <Spinner className='ms-1' animation="border" size='sm' style={{ color: 'var(--main-color)' }} />
                                                                : quantity
                                                        }</div>
                                                        <Button onClick={handleDeliver} className='border-0 deliver-button fw-bold rounded-3' disabled={qLoading}>Delivered</Button>
                                                    </div>

                                                    <Form className='my-3'>
                                                        <Form.Group>
                                                            <Form.Label className='fw-bold restock-label'>Restock the Item</Form.Label>
                                                            <Form.Control onBlur={(e) => setRestock(e.target.value)} type="number" placeholder="Enter the amount" />
                                                        </Form.Group>

                                                        <div className='text-center'><Button onClick={handleRestock} className='border-0 fw-bold my-3 restock-button rounded-3' disabled={qLoading}>Restock</Button></div>
                                                    </Form>

                                                    <div className='manage-inventory text-center'><Link className='d-inline-block link fw-bold p-2 rounded-3 text-decoration-none' to='/manage-inventory' state={{ from: location }}>Manage Inventories</Link></div>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
            }
        </section>
    );
};

export default ItemInfo;