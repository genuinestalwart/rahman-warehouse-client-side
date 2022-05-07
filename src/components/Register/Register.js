import React, { useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useFirebase from '../../hooks/useFirebase';
import ErrorModal from '../Shared/ErrorModal/ErrorModal';
import './Register.css';

const Register = ({ setInfo, setShowToast }) => {
    const {
        navigate,
        errObj, setErrObj,
        email, setEmail,
        password, setPassword,
        validEmail, validPass,
        showModal, setShowModal,
        handleEmail, handlePass
    } = useFirebase();
    const [createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const location = useLocation();

    useEffect(() => {
        if (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrObj({
                    header: 'The email is already registered!',
                    body: 'The email you are trying register with, is already been registered. Try to log in instead.'
                });
                setShowModal(true);
            }
        }
    }, [error, setErrObj, setShowModal]);

    const handleRegister = (event) => {
        event.preventDefault();

        if (email && password && validEmail && validPass) {
            createUserWithEmailAndPassword(email, password)
                .then(() => {
                    handleVerify(user);
                    navigate(location.state?.from?.pathname || '/', { replace: true });
                    setEmail('');
                    setPassword('');
                });
        }
    };

    const handleVerify = (newUser) => {
        sendEmailVerification(newUser)
            .then(() => {
                setInfo('Email Verification!');
                setShowToast(true);
            });
    };

    return (
        <section>
            {
                loading ?
                    <div className='align-items-center d-flex justify-content-center loading-spinner-container' style={{ height: 'calc(100vh - 4rem)' }}>
                        <div className='align-items-center d-flex'>
                            <Spinner className='' animation="border" />
                            <h4 className='fw-bold ms-2 mb-0'>Loading...</h4>
                        </div>
                    </div>
                    :
                    <div className='d-flex justify-content-center py-5'>
                        <div className='register-form-container'>
                            <Form className='border px-5 py-4 rounded-3 shadow'>
                                <h2 className='fw-bold pb-3 text-center'>Register</h2>

                                <Form.Group className="pb-3" controlId="formBasicEmail">
                                    <Form.Label className='register-label'>Email address</Form.Label>
                                    <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" autoComplete='username' />
                                    <Form.Text className={validEmail ? 'd-none' : 'register-warning text-danger'}>Please enter a valid email address</Form.Text>
                                </Form.Group>

                                <Form.Group className="py-2" controlId="formBasicPassword">
                                    <Form.Label className='register-label'>Password</Form.Label>
                                    <Form.Control onBlur={handlePass} type="password" placeholder="Enter password" autoComplete='current-password' />
                                    <Form.Text className={validPass ? 'd-none' : 'register-warning text-danger'}>Password must contain at least a digit, an uppercase letter, a lowercase letter, a special character and must be within 8 to 23 characters.</Form.Text>
                                </Form.Group>

                                <div className='align-items-center d-flex justify-content-between pt-4'>
                                    <Link className='underlined' to='/login' state={{ from: location }}>Don't have an account?</Link>
                                    <Button onClick={handleRegister} className='border-0 fw-bold register-button'>Register</Button>
                                </div>
                            </Form>

                            <div className='align-items-center d-flex justify-content-end py-3'>
                                <Button className='border-0 fw-bold register-button'>Register with Google</Button>
                            </div>
                        </div>

                        <ErrorModal error={errObj} setShowModal={setShowModal} showModal={showModal}></ErrorModal>
                    </div>
            }
        </section>
    );
};

export default Register;