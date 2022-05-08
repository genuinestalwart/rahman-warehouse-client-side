import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import './MyItem.css';

const MyItem = ({ myItem, setYesDelete, setItemId, setShowModal }) => {
    const { _id, name, image, description, price, quantity, supplier } = myItem;

    const handleDelete = () => {
        setItemId(_id);
        setYesDelete(false);
        setShowModal(true);
    };

    return (
        <Col>
            <Card className='my-card rounded-3 shadow'>
                <div className='d-flex justify-content-center py-4'><Card.Img className='w-50' variant="top" src={image} /></div>
                <hr className='my-0' />
                <Card.Body>
                    <Card.Title className='mt-2 mb-4'>{name}</Card.Title>
                    <div>
                        <p className='my-2'><span>Suplier:</span> {supplier}</p>
                        <p className='my-2'><span>Quantity:</span> {quantity}</p>
                        <p className='my-2'><span>Price:</span> ${price}</p>
                        <p className='my-2 text-truncate'><span>Description:</span> {description}</p>
                    </div>
                    <Button onClick={handleDelete} className='border-0 my-button fw-bold my-2'>Delete <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default MyItem;