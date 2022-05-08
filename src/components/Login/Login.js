import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useFirebase from '../../hooks/useFirebase';
import ErrorModal from '../Shared/ErrorModal/ErrorModal';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import './Login.css';

const Login = ({ setInfo, setShowToast }) => {
    const {
        errObj, setErrObj,
        email, setEmail,
        password, setPassword,
        validEmail, validPass,
        showModal, setShowModal,
        handleEmail, handlePass
    } = useFirebase();
    const [signInWithEmailAndPassword,
        epUser, epLoading, epError
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    useEffect(() => {
        if (epError) {
            if (epError.code === 'auth/user-not-found' || epError.code === 'auth/wrong-password') {
                setErrObj({
                    header: 'Invalid email or password!',
                    body: 'Looks like the email/password you entered is incorrect. Please enter any valid email/password.'
                });
                setShowModal(true);
            }
        }

        if (gError) {
            if (gError.code === 'auth/popup-closed-by-user') {
                setErrObj({
                    header: 'Popup Closed by User!',
                    body: 'Looks like you closed the popup tab. Please choose a gmail account to login with.'
                });
                setShowModal(true);
            }
        }
    }, [epError, gError, setErrObj, setShowModal]);

    const handleLogin = (event) => {
        event.preventDefault();

        if (email && password && validEmail && validPass) {
            signInWithEmailAndPassword(email, password)
                .then(() => {
                    fetch('http://localhost:5000/auth', {
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
                    setEmail('');
                    setPassword('');
                });
        }
    };

    const handleReset = () => {
        if (email && validEmail) {
            sendPasswordResetEmail(email)
                .then(() => {
                    setEmail('');
                    setInfo({
                        header: 'Reset Password!',
                        body: 'Mail has been sent. Don\'t forget to check your spam folder.'
                    });
                    setShowToast(true);
                });
        } else {
            setErrObj({
                header: 'Invalid Email!',
                body: 'Please enter any valid email address in the input field before clicking this button.'
            });
            setShowModal(true);
        }
    };

    const handleGoogleLogin = () => {
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
                            <div className='login-form-container'>
                                <Form className='border px-5 py-4 rounded-3 shadow'>
                                    <h2 className='fw-bold pb-3 text-center'>Log In</h2>

                                    <Form.Group className="pb-3" controlId="formBasicEmail">
                                        <Form.Label className='login-label'>Email address</Form.Label>
                                        <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" autoComplete='username' />
                                        <Form.Text className={validEmail ? 'd-none' : 'login-warning text-danger'}>Please enter a valid email address</Form.Text>
                                    </Form.Group>

                                    <Form.Group className="py-2" controlId="formBasicPassword">
                                        <Form.Label className='login-label'>Password</Form.Label>
                                        <Form.Control onBlur={handlePass} type="password" placeholder="Enter password" autoComplete='current-password' />
                                        <Form.Text className={validPass ? 'd-none' : 'login-warning text-danger'}>Password must contain at least a digit, an uppercase letter, a lowercase letter, a special character and must be within 8 to 23 characters.</Form.Text>
                                    </Form.Group>

                                    <div className='align-items-center d-flex justify-content-between pt-4'>
                                        <Link className='underlined' to='/register' state={{ from: location }}>Already have an account?</Link>
                                        <Button onClick={handleLogin} type="submit" className='border-0 fw-bold login-button'>Log in</Button>
                                    </div>
                                </Form>

                                <div className='align-items-center d-flex justify-content-between py-3'>
                                    <button onClick={handleReset} className='bg-transparent border-0 underlined'>Forgot Password?</button>
                                    <Button onClick={handleGoogleLogin} className='border-0 fw-bold login-button'>Log in with Google</Button>
                                </div>
                            </div>

                            <ErrorModal error={errObj} setShowModal={setShowModal} showModal={showModal}></ErrorModal>
                        </div>
            }
        </section>
    );
};

export default Login;