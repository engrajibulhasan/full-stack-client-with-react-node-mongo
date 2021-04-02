import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import LeftNav from '../LeftNav/LeftNav';
import ProductRow from '../ProductRow/ProductRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ManageProduct.css'

const ManageProduct = () => {

    const [deleted,setDeleted]=useState(false)
    const [products,setProducts]=useState([]);
    //Delete product start
    const handleDeleteItem=id=>{
        console.log(id);
        const url=`https://arcane-mountain-19251.herokuapp.com/deleteProduct/${id}`;
        fetch(url,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.ok===1){
                setDeleted(true)
            }
        })
    }
    //Delete product ends


    useEffect(()=>{
        const url=`https://arcane-mountain-19251.herokuapp.com/products`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
        })
    },[deleted])

    return (
        <div className="container addProduct">
            <Row>
                <LeftNav></LeftNav>
                <div className="col-lg-9 col-md-9 col-xs-12 admin-right">
                    <h2>Manage Product</h2>
                    {
                        deleted && <h6 style={{color:'red'}}><FontAwesomeIcon icon={["fas", "check"]} /> Successfully Deleted One Item!</h6>
                    }
                    <table class="table table-borderless custom-manage-table">
                        <thead>
                            <tr className="table-active">
                            <th scope="col">Product Name</th>
                            <th scope="col">Wight/Size</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(pd=><ProductRow key={pd._id} dataObject={pd} handleDeleteItem={handleDeleteItem}></ProductRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </Row>
                
        </div>
    );
};

export default ManageProduct;