import React from 'react';
import './CustomLink.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link to={to} {...props}>
            <div className={`align-items-center d-flex h-100 ${match ? 'active' : 'link'} justify-content-center`}>{children}</div>
        </Link>
    );
};

export default CustomLink;
