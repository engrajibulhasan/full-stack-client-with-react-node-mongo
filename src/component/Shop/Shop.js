import React from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = (props) => {
    const {_id,name,size,price,image}=props.productsObject;
    return (
        <div className="col-lg-4 col-md-4 col-sm-3 col-xs-12 product-box">
            <div className="inner-box shadow p-3 mb-5 bg-white rounded">
                <div className="img-box">
                    <img src={image} alt={name}/>
                </div>
                <h3>{name}</h3>
                <div className="product-footer d-flex justify-content-between">
                    <span className="text-success">${price}</span>
                    <Link className="btn btn-success" to={"/checkout/"+_id}>Buy Now</Link>
                </div>
            </div>
        </div>
    );
};

export default Shop;