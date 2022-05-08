import React from 'react';
import aboutUsImage from '../../../images/about-us.jpg';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <section className='px-5'>
            <h2 className='fw-bold text-center'>About Us</h2>

            <div className='d-flex justify-content-center'>
                <div className='about-us-image d-flex justify-content-center'><img className='w-75' src={aboutUsImage} alt="about us" /></div>
                <div className='about-us-text align-items-center d-flex'>
                    <div className='border-left p-5'>
                        <h4 className='fw-bold'>Who Are We?</h4>
                        <p className='mb-0'>This is a private warehouse business where you can get, store, buy or deliver smartphones of multiple brands. Our office is located at <em>house #9/3 (2nd floor), road #2, shaymoli, 1207 Dhaka</em>.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;