import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useFirebase from '../../hooks/useFirebase';
import ErrorModal from '../Shared/ErrorModal/ErrorModal';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import './Register.css';

const Register = ({ setInfo, setShowToast }) => {
    const {
        errObj, setErrObj,
        email, setEmail,
        password, setPassword,
        validEmail, validPass,
        showModal, setShowModal,
        handleEmail, handlePass
    } = useFirebase();
    const [createUserWithEmailAndPassword,
        epUser, epLoading, epError
    ] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    useEffect(() => {
        if (epError) {
            if (epError.code === 'auth/email-already-in-use') {
                setErrObj({
                    header: 'The email is already registered!',
                    body: 'The email you are trying register with, is already been registered. Try to log in instead.'
                });
                setShowModal(true);
            }
        }

        if (gError) {
            if (gError.code === 'auth/popup-closed-by-user') {
                setErrObj({
                    header: 'Popup Closed by User!',
                    body: 'Looks like you closed the popup tab. Please choose a gmail account to register with.'
                });
                setShowModal(true);
            }
        }
    }, [epError, gError, setErrObj, setShowModal]);

    const handleRegister = (event) => {
        event.preventDefault();

        if (email && password && validEmail && validPass) {
            createUserWithEmailAndPassword(email, password)
                .then(() => {
                    fetch('https://rahman-warehouse-backend.herokuapp.com/auth', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    })
                        .then(res => res.json())
                        .then(({ accessToken }) => {
                            localStorage.setItem('accessToken', accessToken);
                        });
                    if (!epError) {
                        handleVerify(epUser);
                    }
                    setEmail('');
                    setPassword('');
                });
        }
    };

    const handleVerify = (newUser) => {
        sendEmailVerification(newUser)
            .then(() => {
                setInfo({
                    header: 'Email Verification!',
                    body: 'Mail has been sent. Don\'t forget to check your spam folder.'
                });
                setShowToast(true);
            });
    };

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then(() => {
                setEmail('');
                setPassword('');
            });
    };

    return (
        <section>
            {
                loading || epLoading || gLoading ?
                    <LoadingSpinner height='calc(100vh - 4rem)'></LoadingSpinner>
                    : user || epUser || gUser ?
                        <Navigate to={location?.state?.from?.pathname || '/'} state={{ from: location }} replace />
                        : <div className='d-flex justify-content-center py-5'>
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
                                        <Link className='underlined' to='/login' state={{ from: location }}>Already have an account?</Link>
                                        <Button onClick={handleRegister} className='border-0 fw-bold register-button'>Register</Button>
                                    </div>
                                </Form>

                                <div className='align-items-center d-flex justify-content-end py-3'>
                                    <Button onClick={handleGoogleRegister} className='border-0 fw-bold register-button'>Register with Google</Button>
                                </div>
                            </div>

                            <ErrorModal error={errObj} setShowModal={setShowModal} showModal={showModal}></ErrorModal>
                        </div>
            }
        </section>
    );
};

export default Register;