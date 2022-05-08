import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './MyItems.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import MyItem from '../MyItem/MyItem';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';

const MyItems = ({ logOut }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/my-items?email=${user.email}`, {
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
                console.log('once');
                setItems(data);
                setLoading(false);
            })
            .catch((error) => {
                if (error.status === 401 || error.status === 403) {
                    logOut();
                }
            });
    }, [user, logOut]);

    return (
        <section className='my-5'>
            {
                loading ?
                    <LoadingSpinner height='calc(100vh - 4rem)'></LoadingSpinner>
                    : <Container className='my-items-container' fluid>
                        <Row className='g-5' xs={1} md={3}>
                            {
                                items.map(item => <MyItem key={item._id} myItem={item}></MyItem>)
                            }
                        </Row>
                    </Container>
            }
        </section>
    );
};

export default MyItems;