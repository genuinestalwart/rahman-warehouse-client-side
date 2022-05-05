import React from 'react';
import banner from '../../../images/banner.jpg';

const Banner = () => {
    return (
        <section style={{ height: 'calc(100vh - 4rem)' }}>
            <div className='h-100'><img className='h-100 w-100' style={{ objectFit: 'cover' }} src={banner} alt="banner" /></div>
        </section>
    );
};

export default Banner;