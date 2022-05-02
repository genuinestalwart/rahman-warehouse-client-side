import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import './Item.css';

const Item = ({ item, index }) => {
    const { _id, name, price, quantity } = item;

    return (
        <tr>
            <td className='align-middle'>{index + 1}</td>
            <td className='align-middle'>{name}</td>
            <td className='align-middle'>{_id}</td>
            <td className='align-middle'>${price}</td>
            <td className='align-middle'>{quantity}</td>
            <td className='align-middle'><Button className='border-0 delete-button py-2 rounded-circle'><FontAwesomeIcon className='fs-5' icon={faTrashCan}></FontAwesomeIcon></Button></td>
        </tr>
    );
};

export default Item;