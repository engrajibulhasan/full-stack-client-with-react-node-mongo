import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductRow = (props) => {
    const {_id,name,size,price}=props.dataObject;
    return (
        <>
            <tr >
                <th scope="row">{name}</th>
                <td>{name}</td>
                <td>{size}</td>
                <td>
                    <button className="btn btn-success"><FontAwesomeIcon icon={["fas", "pen"]} /></button> 
                    <button className="btn btn-danger" onClick={()=>props.handleDeleteItem(_id)}><FontAwesomeIcon icon={["fas", "trash-alt"]} /></button>
                </td>
            </tr>
        </>
    );
};

export default ProductRow;