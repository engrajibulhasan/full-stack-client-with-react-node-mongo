import React from 'react';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LeftNav.css'
import { Link } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="col-lg-3 col-md-3 col-xs-12 admin-left">
            <h2>Monis Collection</h2>
            <ul className="nav flex-column">
                <li className="nav-item"><Link to="/manageProduct" className="nav-link"> <FontAwesomeIcon icon={["fas", "th-large"]} />Manage Product</Link> </li>
                <li className="nav-item"><Link to="/admin" className="nav-link"><FontAwesomeIcon icon={["fas", "plus"]} /> Add Product</Link> </li>
                <li className="nav-item"><Link to="/admin" className="nav-link"><FontAwesomeIcon icon={["fas", "pen"]} /> Edit Product</Link> </li>
            </ul>
        </div>
    );
};

export default LeftNav;