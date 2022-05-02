import React from 'react';
import './HomeItem.css';
import { Button, Card, Col } from 'react-bootstrap';

const HomeItem = ({ homeItem }) => {
    const { name, image, description, price, quantity, supplier } = homeItem;

    return (
        <Col>
            <Card className='rounded-3 shadow'>
                <div className='d-flex justify-content-center py-4'><Card.Img className='w-50' variant="top" src={image} /></div>
                <hr className='my-0' />
                <Card.Body>
                    <Card.Title className='mt-2 mb-4'>{name}</Card.Title>
                    <div>
                        <p className='my-2'><span>Suplier:</span> {supplier}</p>
                        <p className='my-2'><span>Quantity:</span> {quantity}</p>
                        <p className='my-2'><span>Price:</span> {price}</p>
                        <p className='my-2 text-truncate'><span>Description:</span> {description}</p>
                    </div>
                    <Button className='border-0 button fw-bold my-2'>Update</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default HomeItem;