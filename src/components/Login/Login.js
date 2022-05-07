import React, { useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useFirebase from '../../hooks/useFirebase';
import ErrorModal from '../Shared/ErrorModal/ErrorModal';
import './Login.css';

const Login = ({ setInfo, setShowToast }) => {
    const {
        navigate,
        errObj, setErrObj,
        email, setEmail,
        password, setPassword,
        validEmail, validPass,
        showModal, setShowModal,
        handleEmail, handlePass
    } = useFirebase();
    const [signInWithEmailAndPassword,
        user, loading, error
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const location = useLocation();

    useEffect(() => {
        if (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setErrObj({
                    header: 'Invalid email or password!',
                    body: 'Looks like the email/password you entered is incorrect. Please enter any valid email/password.'
                });
                setShowModal(true);
            }
        }
    }, [error, setErrObj, setShowModal]);

    const handleLogin = (event) => {
        event.preventDefault();

        if (email && password && validEmail && validPass) {
            signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigate(location?.state?.from?.pathname || '/', { replace: true });
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
                    setInfo('Reset Password!');
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
                                <Button className='border-0 fw-bold login-button'>Log in with Google</Button>
                            </div>
                        </div>

                        <ErrorModal error={errObj} setShowModal={setShowModal} showModal={showModal}></ErrorModal>
                    </div>
            }
        </section>
    );
};

export default Login;