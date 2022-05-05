import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = ({ setLogin }) => {
    useEffect(() => {
        setLogin(false);
    });

    return (
        <section className='d-flex justify-content-center py-5'>
            <div className='login-form-container'>
                <Form className='border px-5 py-4 rounded-3 shadow'>
                    <h2 className='fw-bold pb-3 text-center'>Register</h2>

                    <Form.Group className="pb-3" controlId="formBasicEmail">
                        <Form.Label className='login-label'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="py-2" controlId="formBasicPassword">
                        <Form.Label className='login-label'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>

                    <div className='align-items-center d-flex justify-content-between pt-4'>
                        <Link className='underlined' to='/login'>Don't have an account?</Link>
                        <Button className='border-0 fw-bold login-button'>Register</Button>
                    </div>
                </Form>

                <div className='align-items-center d-flex justify-content-end py-3'>
                    <Button className='border-0 fw-bold login-button'>Register with Google</Button>
                </div>
            </div>
        </section>
    );
};

export default Register;