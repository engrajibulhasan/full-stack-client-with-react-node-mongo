import React, { useContext } from 'react';
import './Header.css';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { UserContext } from '../../App';
import { handleSignOut, initializeLoginFramework } from '../Login/LoginManager';

const Header = () => {
    initializeLoginFramework();
    //Sign Out
  const signOut=()=>{
    handleSignOut()
    .then(res=>{
        //setUserInfo(res);
        setLoggedInUser(res);
        //history.replace(from);
    })
  }
  
   //Importing UserContext variable  from App.js  into useContext() hook here
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  let photo='https://i.ibb.co/jJW1p1K/user.png';
  if(loggedInUser.photo){
    photo=loggedInUser.photo;

  }else{
       
  }
  //console.log(loggedInUser.name?loggedInUser.name : loggedInUser.displayName);
    return (
        <header>
            <Navbar expand="lg">
                <Container >
                <Navbar.Brand><Link to="/">Monis Collection | <small>Your Desire shopping</small></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav >
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/orders" className="nav-link">Orders</Link>
                    <Link to="/admin" className="nav-link">Admin</Link>
                    <Link to="/deals" className="nav-link">Deals</Link>
                    {
                        loggedInUser.email? <><Link to="/orders" style={{fontWeight:'bold'}} className="nav-link"><div className="avatar"><img src={photo} alt="user avatar"/></div><span className="user-name"> {loggedInUser.name ? loggedInUser.name : loggedInUser.displayName}</span></Link> <button onClick={signOut} className="btn btn-danger">Sign out </button></>:<Link to="/login" className="nav-link btn btn-light">Login</Link>
                    }
                    
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;