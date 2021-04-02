// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import firebaseConfig from './firebase.config';



//Firebase Initialization
export const initializeLoginFramework=()=>{
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}


//Handle Google Sign in
export const handleGoogleSignIn=()=>{
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
        const {displayName,photoURL,email}=res.user;
        const signedInUser={
            isSignedIn:true,
            name:displayName,
            email:email,
            password:'',
            photo:photoURL,
            error:'',
            success:'Google Sign in Successful'
        }
        return signedInUser;
    }).catch(error=>{
        console.log(error);
    })
}



//Handle Facebook Sign In
export const handleFbSignIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(fbProvider)
    .then(res =>{
        const {displayName,photoURL,email}=res.user;
        const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        password:'',
        photo:photoURL,
        error:'',
        success:'Facebook sign in successful'
        }
        return signedInUser;
    }).catch(error=>{
        console.log(error);
    })
}


//Handle Sign Out
export const handleSignOut=()=>{
    return firebase.auth().signOut()
    .then(()=>{
        //console.log('signed out');
        const signedOutUser={
        isSignedIn:false,
        name:'',
        email:'',
        password:'',
        photo:'',
        error:'',
        success:''
        }
        return signedOutUser;
    }).catch(error=>{
        console.log(error)
    })
}






//Sign Up with Email and Password      
export const createUserWithEmailAndPassword=(name,email,password)=>{
    //Firebase code
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=email+ ' created and signed in  successfully';
      newUserInfo.isSignedIn=true;
      newUserInfo.isSignedIn=true;
      updateUserName(name);
      newUserInfo.name=name;
      return newUserInfo;
      
      // ...
    })
    .catch((error) => {
      const newUserInfo={}
      newUserInfo.error=error.message;
      return newUserInfo;
    });
}




//Sign In with Email and Password
export const signInWithEmailAndPassword=(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        // Signed in
        const newUserInfo=res.user;
        newUserInfo.error='';
        newUserInfo.success=email+ ' signed in  successfully';
        newUserInfo.isSignedIn=true;
        return newUserInfo;
    })
    .catch((error) => {
        const newUserInfo={}
        const errorCode = error.code;
        newUserInfo.error=error.message;
        console.log('hello');
        return newUserInfo;
    });
    
}


const updateUserName=(name)=>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    })
    .then(res=> {
      console.log('Update Successful')
      //return res;
    }).catch(error=>{
      console.log(error+'by update');
    });
  }