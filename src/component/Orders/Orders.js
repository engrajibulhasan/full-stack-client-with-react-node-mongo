import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import ShowOrders from '../ShowOrders/ShowOrders';

const Orders = () => {
    const [orders,setOrders]=useState([]);
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const email=loggedInUser.email;

    //Getting Orders based on email
    useEffect(()=>{
        const url=`https://arcane-mountain-19251.herokuapp.com/showOrders/${email}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            if(data){
                setOrders(data);
            }
        })
    },[email])
    
    return (
        <div className="container checkout-area">
            <h2>Hi dear {loggedInUser.name ? loggedInUser.name : loggedInUser.displayName}! </h2>
            <p>You have <span className="badge bg-success">{orders.length}</span> Order/Orders, Check and review your orders from here.</p>
            <div className="custom-wrapper" id="checkoutWrapper">
                <table className="table table-striped custom-checkout-table">
                    <thead>
                        <tr style={{borderBottom:'1px solid rgba(0,0,0,0.25)'}}>
                            <th className="text-left" scope="col">Date</th>
                            <th className="text-left" scope="col">Order ID</th>
                            <th className="text-right" scope="col">Price</th>
                            <th className="text-right" scope="col">Discount</th>
                            <th className="text-right" scope="col">Delivery Charge</th>
                            <th className="text-right" scope="col">Total</th>
                            <th className="text-center" scope="col">Quantity</th>
                            <th className="text-center" scope="col">Payment Type</th>
                            <th className="text-center" scope="col">Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order=><ShowOrders dataObject={order}></ShowOrders>)
                        }
                        
 
                    </tbody>
                </table>
                
            </div>
        </div>
    );
};

export default Orders;