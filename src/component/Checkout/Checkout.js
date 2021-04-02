import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Checkout.css';
import ShowCheckoutProduct from '../ShowCheckoutProduct/ShowCheckoutProduct';

const Checkout = () => {
    const {id}=useParams();
    const [checkoutData,setCheckoutData]=useState({});
    const [success,setSuccess]=useState(false);
    //Importing UserContext variable  from App.js  into useContext() hook here
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);

    //Getting Data based on ID
    useEffect(()=>{
        const url=`http://localhost:5000/showProductById/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data){
                setCheckoutData(data);
            }
            
        })
    },[id])
    

    const handleCheckout=()=>{
        const orderNumber=Math.floor(100000000 + Math.random() * 900000000);
        const orderInfo={
            email:loggedInUser.email,
            productId:id,
            orderNumber:orderNumber,
            totalPrice:checkoutData.price,
            discount:0,
            quantity:1,
            deliveryCharge:60,
            orderDate:new Date()
        }

        //Sending Data to API
        const url=`http://localhost:5000/addOrder`;
        fetch(url,{
            method:"POST",
            headers:{
                'Content-type':'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(orderInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data){
                const wrapper=document.getElementById('checkoutWrapper');
                wrapper.style.display="none";
                setSuccess(true);
            }else{
                setSuccess(false);
            }
        })
    }


    

    

    return (
        <div className="container checkout-area">
            {
                !success && <h2>Checkout</h2>
            }
            {
                success && <><h2 style={{color:'green'}}><FontAwesomeIcon icon={["fas", "check"]} /> Checkout Successful</h2><Link className="btn btn-success" to="/orders">Check Orders</Link></>
            }
            <div className="custom-wrapper" id="checkoutWrapper">
                <table className="table table-borderless custom-checkout-table">
                    <thead>
                        <tr style={{borderBottom:'1px solid rgba(0,0,0,0.25)'}}>
                            <th className="text-left" scope="col">Description</th>
                            <th className="text-center" scope="col">Quantity</th>
                            <th className="text-right" scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <ShowCheckoutProduct dataObject={checkoutData}></ShowCheckoutProduct>
                        

                        <tr style={{borderTop:'1px solid rgba(0,0,0,0.25)'}}>
                            <td className="text-left"  colSpan="2">Total</td>
                            <td className="text-right">${checkoutData.price}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleCheckout} className="btn btn-success"> Checkout </button>
            </div>
        </div>
    );
};

export default Checkout;