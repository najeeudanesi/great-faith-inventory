"use client"
import "./auth.css"
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup,signInWithEmailAndPassword, signOut } from "firebase/auth";
import {useRouter} from "next/navigation"
import Login from "@mui/icons-material/Login"
import Google from "@mui/icons-material/Google"

export const Auth = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try{
        await signInWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
          const user = userCredential.user;
        console.log(user);
        navigate.push("/api/Dashboard")
        })

        
    }
    catch(e){
        console.error("Error occured: " + e);
    }
    
  };

  const signInWithGoogle = async () => {
    try{
        await signInWithPopup(auth, googleProvider)
        .then ((userCredential) => {
          const user = userCredential.user;
        console.log(user);
        navigate.push("/api/Dashboard")
        })
    }
    catch(e){
      console.error('Error occured: '+ e)
    }
  }

  
  return (
    <div className="centered-div w-full max-w-xs">
      <h1 className="text-4xl text-center font-semibold mb-12">Sign in</h1>
      <input className=" input input-decoration mb-12" type="text" placeholder="email..." onChange={(e) => setEmail(e.target.value)}/>
     
      <input className="input input-decoration mb-24" type="password" placeholder="password.."onChange={(e) => setPassword(e.target.value)} />
      
      <button className="primary-button btn-pad" onClick={signIn}> <Login/>  Sign in</button>
    
      <button className="input input-decoration btn-pad" onClick={signInWithGoogle}><Google/>  Sign in with Google</button>
     
      
    </div>
  );
};
