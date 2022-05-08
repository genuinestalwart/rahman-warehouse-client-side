import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './MyItems.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import MyItem from '../MyItem/MyItem';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import ConfirmModal from '../Shared/ConfirmModal/ConfirmModal';

const MyItems = ({ logOut }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [yesDelete, setYesDelete] = useState(false);
    const [itemId, setItemId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`https://rahman-warehouse-backend.herokuapp.com/my-items?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                const { ok, status } = res;

                if (ok) {
                    return res.json();
                }

                const error = { ok, status };
                throw error;
            })
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch((error) => {
                if (error.status === 401 || error.status === 403) {
                    logOut();
                }
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
    }, [user, logOut, yesDelete, itemId]);

    return (
        <section className={items.length ? 'my-5' : ''}>
            {
                loading ?
                    <LoadingSpinner height='calc(100vh - 4rem)'></LoadingSpinner>
                    : items.length ?
                        <Container className='my-items-container' fluid>
                            <Row className='g-5' xs={1} md={3}>
                                {
                                    items.map(item => <MyItem key={item._id} myItem={item} setYesDelete={setYesDelete} setItemId={setItemId} setShowModal={setShowModal}></MyItem>)
                                }
                            </Row>
                        </Container>
                        : <div className='align-items-center d-flex justify-content-center' style={{ color: 'var(--main-color)', height: 'calc(100vh - 4rem)' }}>
                            <h4 className='fw-bold mb-0'>No Item Found!</h4>
                        </div>
            }

            <ConfirmModal setYesDelete={setYesDelete} setShowModal={setShowModal} showModal={showModal}></ConfirmModal>
        </section>
    );
};

export default MyItems;