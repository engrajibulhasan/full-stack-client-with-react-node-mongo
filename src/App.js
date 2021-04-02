import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Header from './component/Header/Header';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

//Font Awesome Library for individual component use
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'


import Admin from './component/Admin/Admin';
import Orders from './component/Orders/Orders';
import ManageProduct from './component/ManageProduct/ManageProduct';
import Checkout from './component/Checkout/Checkout';
import Deals from './component/Deals/Deals';


export const UserContext=createContext();

//Passing fonts using Library
library.add(fab,fas)
function App() {
  const [loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <Router>

      <>
        
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>

          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <Route path="/deals">
            <Deals></Deals>
          </Route>
          
              
          <PrivateRoute exact path="/checkout/:id">
            <Checkout></Checkout>
          </PrivateRoute>
          

          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>

          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>

          <PrivateRoute path="/ManageProduct">
            <ManageProduct></ManageProduct>
          </PrivateRoute>

          
        </Switch>
      </>

    </Router>
    </UserContext.Provider>
    
  );
}

export default App;
