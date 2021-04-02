import axios from 'axios';
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Admin.css';
import LeftNav from '../LeftNav/LeftNav';
import { useForm } from 'react-hook-form';

const Admin = () => {
    const [added,setAdded]=useState(false);
    const { register, handleSubmit, watch, errors } = useForm()
    const [imageUrl,setImageUrl]=useState(null);
    const onSubmit = data => {
        const productDetail={
            name:data.title,
            size:data.size,
            price:data.price,
            image:imageUrl
        }
        console.log(productDetail);
        const url=`http://localhost:5000/addProduct`;
        fetch(url,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(productDetail)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data){
                setAdded(true);
            }
        })
    }

  const handleImageUpload=(event)=>{
      //console.log(event.target.files);
      console.log(event.target.files[0]);
      const imageData=new FormData();
      //imagebb API key here
      imageData.set('key','64be5935eb0b244b7c45902a3549373b');
      imageData.append('image',event.target.files[0]);

      //uploading into image bb
      axios.post('https://api.imgbb.com/1/upload',imageData)
      .then(function (response) {
        const resUrl=response.data.data.display_url;
        console.log(resUrl);
        setImageUrl(resUrl);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    return (
        <div className="container addProduct">
            <Row>
                <LeftNav></LeftNav>

                <div className="col-lg-9 col-md-9 col-xs-12 admin-right">
                    <h2>Add Product</h2>
                    {
                        added && <h6 style={{color:'green'}}><FontAwesomeIcon icon={["fas", "check"]} /> You have added a product!</h6>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} className="row">
                        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label htmlFor="title">Product Name</label>
                            <input type="text" className="form-control" placeholder="Enter Product Name" name="title" id="title" ref={register} onClick={()=>setAdded(false)}/>
                            </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label htmlFor="size">Size/Wight</label>
                            <input type="text" className="form-control" placeholder="Enter Size or Wight  Name" name="size" id="size" ref={register({ required: true })}/>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" placeholder="Unit Price" name="price" id="price" ref={register({ required: true })}/>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <label htmlFor="image">Upload Image</label>
                            <input type="file" className="form-control" name="image" id="image" onChange={handleImageUpload}/>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <button className="btn btn-primary brn-sm" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </Row>
        </div>
    );
};

export default Admin;