import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import firebaseConfig from '../../firebase_config';
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const app = initializeApp(firebaseConfig); // Custom Firebase Config File //

function Login() {
  const [userLogin, setUserLogin]= useContext(userContext)
  // Google Auth Login //
  const googleProvider = new GoogleAuthProvider();

  const googleLogin=()=>{
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
    .then(res=>{
      const {displayName, email, photoURL}= res.user;
      setUser({isLogin: true, name: displayName, email:email, photo:photoURL})
    })
    .catch(err=>{
      console.log(err);
    })
  }
// Google Logout //
  const googleLogout=()=>{
    const auth = getAuth();
    signOut(auth)
    .then(()=>{
    setUser({isLogin:false, name:'', email: '', photo:''})
    })
    .catch(err=>{
      console.log(err);
    }) 
  }

  // Facebook Auth Login //
  const fbProvider = new FacebookAuthProvider();

  const fbLogin=()=>{
    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log('fb user', user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
  }
//////////////////////////////////////////////////////////////////////////////////////////////////
  const [user, setUser]=useState({isLogin:false, name:'', email:'', photo:'', password:'', userError:'', success:false}); 
  const [newUser, setNewUser]= useState(false); // new user Conditional state //
  let location= useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || "/"; //Redirect after login //

// Form Validation Condition //
  const handleLogin=(e)=>{
    let isField=false;
    if(e.target.name==='name'){
      isField= /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/.test(e.target.value); //a-z,A-Z must be any digit, any name //
    }
    if(e.target.name==='email'){
      isField= /\S+@\S+\.\S+/.test(e.target.value); //must be @ then something '.' something //
    }
    if(e.target.name==='password'){
      isField= /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{8,32}$/.test(e.target.value); // must be 8digit, must have any number // 
    }
    if(isField){ 
      const userField= {...user};
      userField[e.target.name]= e.target.value;
      setUser(userField);
    }
  }

// Registration for NewUser //
const handleSubmit= (event)=>{
  if(newUser && user.email && user.password){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(() => {
    // Signed up //
    const userField= {...user};
    userField.userError='';
    userField.success= true;
    setUser(userField);
    updateUserName(user.name);
  })
  .catch((error) => {
    // error handle //
    const userField= {...user};
    userField.userError= error.code;
    userField.success=false;
    setUser(userField);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  }

// Sign-in for Existing User //
  if(!newUser && user.email && user.password){
    const auth = getAuth();
  signInWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    // Signed in //
    const user = userCredential.user;
    const userField= {...user};
    userField.userError='';
    userField.success= true;
    setUser(userField);
    console.log('your name', userCredential.user);
    setUserLogin(userField);
    navigate(from, { replace: true });
  })
  .catch((error) => {
    // error handle //
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    const userField= {...user};
    userField.userError=error.code;
    userField.success= false;
    setUser(userField);
  });
  }
  event.preventDefault();

// Adding User Name //
const updateUserName=(name)=>{
  const auth = getAuth();
  updateProfile(auth.currentUser, {
    displayName: name
  }).then(() => {
    console.log('Updated Name');
  }).catch((error) => {
    // An error occurred
    console.log(error);
  });
}
}

  return (
    <div style={{textAlign:'center', margin:'50px'}}>
      <form action="">
        <div style={{color:'red'}}>{!newUser ? <h1>Login First</h1> : <h1>SignUp First</h1>}</div>
        <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} />
        <label htmlFor="newUser">New In Here?</label>
        <br/>
        {newUser && <input type="text" onBlur={handleLogin} placeholder='Enter Your Name' name='name' required/>}
        <br/>
        <input type="text" onBlur={handleLogin} placeholder='Enter Your Email' name='email' required/>
        <br/>
        <input type="password" onBlur={handleLogin} placeholder='Enter Your Password' name='password' required/>
        <br/>
        <input type="submit" onClick={handleSubmit} value={newUser?'Sign Up':'Login'} />
      </form>
      <p style={{color:'red'}}>{user.userError}</p>
      {user.success && <p style={{color:'green'}}>Hurray! User {newUser?'Created':'Login'} Successfully</p>}
      {user.success && <p>Hello {user.displayName}</p>}

{/* For Gmail */}
       {user.isLogin ? <button onClick={googleLogout}>Sign Out</button> : <button onClick={googleLogin}>Sign In with Google</button>}
       <br/>
       <button onClick={fbLogin}>Sign in with Facebook</button>
      
      {user.isLogin && 
      <div>
        <h3>Hello {user.name}</h3>
        <h3>Your Mail {user.email}</h3>
        <img src={user.photo} alt="" />
      </div>}
    </div>
  )
}

export default Login