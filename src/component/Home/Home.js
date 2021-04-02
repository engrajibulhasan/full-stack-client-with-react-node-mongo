import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Shop from '../Shop/Shop';
import './Home.css';

const Home = () => {
    
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        const url=`http://localhost:5000/products`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
        })
    },[])
    
    //setTransportTypes();
    //console.log(transportTypes);
    return (
        <>
        {
            //Homepage Spinner
            products.length === 0 && <div style={{height:'100%',width:'100%',position:'absolute',top:'0',left:'0',backgroundColor:'white',transition:'500ms'}}><div style={{height:'100%'}} className="d-flex align-items-center justify-content-center"><div className="spinner-border" role="status"><span className="visually-hidden" style={{display:'none'}}>Loading...</span></div></div></div>
        }
        <div className="home-area">
            <div className="container">
                <Row >
                    
                    {
                        products.map(pd=><Shop key={pd._id} productsObject={pd}></Shop>)
                    }
                </Row>
            </div>
            
        </div>
        </>
    );
};

export default Home;