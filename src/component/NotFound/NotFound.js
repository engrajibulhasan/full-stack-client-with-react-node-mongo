import React from 'react';
import './NotFound.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-area container">
            <FontAwesomeIcon icon={["fas", "cat"]} />
            <h1>404 Not Found</h1>
            <p>Bad URL. 404 page not found. Please follow the Links</p>
            <Link className="btn btn-success" to="/">Go Home</Link>
        </div>
    );
};

export default NotFound;