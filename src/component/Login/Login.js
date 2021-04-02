import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleSignOut, handleGoogleSignIn, initializeLoginFramework, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';
import './Login.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Login() {
  initializeLoginFramework();
  const [loginError,setLoginError]=useState('');
  const [newUser,setNewUser]=useState(false)
  const[userInfo,setUserInfo]=useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success:''
  });

  //Importing UserContext variable  from App.js  into useContext() hook here
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);

  //For redirecting user to Where he came from
  const history=useHistory();
  const location=useLocation();
  let { from } = location.state || { from: { pathname: "/" } };



  //Google Sign in
  const googleSignIn=()=>{
    handleGoogleSignIn()
    .then(res=>shortenResponse(res,true))
  }

  //Facebook Sign In
  const fbSignIn=()=>{
    handleFbSignIn()
    .then(res=>shortenResponse(res,true))
  }


 


  //Sign Out
  const signOut=()=>{
    handleSignOut()
    .then(res=>shortenResponse(res,false))
  }
  
 
  //Custom Sign in area

  //Error Handling using Regular expression
  const handleBlur=(event)=>{

    let isFormValidate=true;
    const targetName=event.target.name;
    const targetValue=event.target.value;
    
   
    //console.log(event.target.name,event.target.value)
    
    if(targetName==='email'){
      const regExp=/\S+@\S+\.\S+/;
      const isEmailValidate=regExp.test(targetValue);
      const isFormValidate=isEmailValidate;
      !isEmailValidate? setLoginError('Please provide valid email') : setLoginError('');
      //console.log(isEmailValidate)
    }

    if(targetName==='password'){
      const pass=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      const passHasNumber=pass.test(targetValue);
      const isFormValidate=passHasNumber;
      //console.log(isFormValidate+'only pass'+passHasNumber);
      !passHasNumber && setLoginError('Password should be numeric digit, one uppercase and one lowercase letter') 
      //console.log(isPassValidate)
    }

    if(targetName==='repassword'){
      const pass=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      const passHasNumber=pass.test(targetValue);
      const isFormValidate=passHasNumber;
      const password=userInfo.password;
      if( !passHasNumber || password!==targetValue){
        setLoginError('Password and Confirm Password should be same & must be contain numeric digit, one uppercase and one lowercase letter');
      }else{
        setLoginError('');
      } 
    }

   


    if(isFormValidate){
      
      //copying object data from state
      const newUserInfo={...userInfo}
      //assigning new value
      newUserInfo[targetName]=targetValue;
      console.log('---------------');
      console.log(targetName);
      setUserInfo(newUserInfo);
     
    }else{
      const newUserInfoFalse={...userInfo}
      newUserInfoFalse[targetName]="";
      setUserInfo(newUserInfoFalse);
    }
    
  } 
  //End handleblur




  //Submitting the form and inserting into firebase
  const handleSubmit=(event)=>{
    event.preventDefault();
    //console.log('submitted');

    //Sign up
    if(newUser && userInfo.email && userInfo.password && loginError.length===0){
      console.log('signup'+loginError.length);
      //console.log(userInfo.name+ 'submitted new user');
      createUserWithEmailAndPassword(userInfo.name, userInfo.email, userInfo.password)
      .then(res=>shortenResponse(res,true))
    }
    
    
    //Sign in
    if(!newUser && userInfo.email && userInfo.password ){
        console.log('submitted existing users');
      signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res=>shortenResponse(res,true))
    }
  }


  const shortenResponse=(res, redirectAction)=>{
    console.log(res);
    
    if(res.error){
      console.log('eita dekhan');
      setLoginError(res.error);
    }else{
      setLoginError('');
      setUserInfo(res);
      setLoggedInUser(res);
      redirectAction && history.replace(from);
    }
    
  }


  return (
    
      <div className="container login-area">
            <div className=" col-lg-5 col-md-5 col-sm-8 col-xs-12 mx-auto login-box">
                <div className="customAuth">
                    {
                      userInfo.error && <p style={{color:'red'}}> {userInfo.error}</p>
                    }  
                    {
                      newUser?<h2>Create New Account</h2> : <h2>Login</h2>
                    }
                    {
                      loginError && <p style={{color:'red',fontSize:'12px'}}>{loginError}</p>
                    }
                    
                    <form onSubmit={handleSubmit}>
                      {
                        newUser && <div className="form-group"><input onBlur={handleBlur} type="text" className="form-control" name="name" placeholder="Name" required/></div>
                      }
                        
                        <div className="form-group">
                            <input onBlur={handleBlur} type="email" id="password" className="form-control" name="email" placeholder="Username E-mail" required/>
                        </div>
                        <div className="form-group">
                            <input onBlur={handleBlur} type="password" id="repassword" className="form-control" name="password" placeholder="Password" required/>
                        </div>
                        {
                          newUser && <div className="form-group"><input onBlur={handleBlur} type="password" className="form-control" name="repassword" placeholder="Confirm Password" required/></div>
                        }
                        

                        {
                          !newUser && <RememberMe></RememberMe>
                        }
                        


                        <div className="form-group form-buttons-area">
                            {newUser? <><input className="signing" type="submit" value="Create New Account"/><p>Already have an account? <span onClick={()=>setNewUser(false)}>Login</span></p></> : <><input className="signing" type="submit" value="Login"/><p>Don't have an account? <span onClick={()=>setNewUser(true)}>Create an Account</span></p></>}
                        </div>
                        
                    </form>
                </div>
                <p>---------------or---------------</p>
                <div className="socialAuth">
                    <button onClick={fbSignIn} className="btn btn-outline-primary fb" type="button"><FontAwesomeIcon icon={["fab", "facebook"]} /> Continue with Facebook</button>
                    <button onClick={googleSignIn} className="btn btn-outline-danger google" type="button"><FontAwesomeIcon icon={["fab", "google"]} /> Continue with Google</button>
                </div>
            </div>
        </div>
  );
}


const RememberMe=()=>{
  return (
    <div className="remember-me d-flex justify-content-between">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
        <label className="form-check-label" htmlFor="flexCheckDefault">Remember Me</label>
      </div>
      <Link to="#">Forgot Password?</Link>
    </div>
  );
}

export default Login;
