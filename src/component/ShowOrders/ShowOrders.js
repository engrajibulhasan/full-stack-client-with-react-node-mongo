import React, { useEffect, useState } from 'react';

const ShowOrders = (props) => {
    const [productInfo,setProductInfo]=useState({});
    const {productId,orderNumber,quantity,totalPrice,discount,deliveryCharge,orderDate}=props.dataObject;
    const total=(parseInt(totalPrice)+parseInt(deliveryCharge))-parseInt(discount);

    //Getting Product Info based on productId
    // useEffect(()=>{
    //     const url=`http://localhost:5000/showProductById/${productId}`;
    //     fetch(url)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         //console.log(data);
    //         if(data){
    //             console.log(data)
    //             setProductInfo(data);
    //         }
    //     })
    // },[productId])

    const dateFormating=(theDate)=>{
        return (new Date(theDate)).toDateString('dd/MM/YY');
    }


    return (
        <>
            <tr >
                <td className="text-left">{dateFormating(orderDate)} </td>
                <td className="text-left">#{orderNumber} </td>
                <td className="text-right">${totalPrice} </td>
                <td className="text-right">${discount} </td>
                <td className="text-right">${deliveryCharge} </td>
                <td className="text-center">${total}</td>
                <td className="text-center">{quantity}</td>
                <td className="text-center"><span class="badge bg-primary">Cash on Delivery</span></td>
                <td className="text-center"><span class="badge bg-secondary">Delivery Pending</span></td>
            </tr>
        </>
    );
};

export default ShowOrders;