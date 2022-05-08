import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './ContactUs.css';

const ContactUs = () => {
    return (
        <section className='d-flex justify-content-center pb-5'>
            <div className='contact-form-container'>
                <Form className='border px-5 py-4 rounded-3 shadow'>
                    <h2 className='fw-bold pb-3 text-center'>Contact Us</h2>

                    <Form.Group className="pb-3">
                        <Form.Label className='contact-label'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" autoComplete='username' />
                    </Form.Group>

                    <Form.Group className='py-2'>
                        <Form.Label className='contact-label'>Message</Form.Label>
                        <Form.Control as='textarea' placeholder='Write your message here' rows='5' />
                    </Form.Group>

                    <div className='d-flex justify-content-center pt-4'>
                        <Button className='border-0 fw-bold contact-button px-5'>Send</Button>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default ContactUs;