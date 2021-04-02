import React from 'react';

const ShowCheckoutProduct = (props) => {
    const {name,size,price}=props.dataObject;
    return (
        <>
            <tr >
                <td className="text-left">{name}, {size} </td>
                <td className="text-center">1</td>
                <td className="text-right">${price}</td>
            </tr>
        </>
    );
};

export default ShowCheckoutProduct;