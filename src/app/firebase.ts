import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBfPzS05M9HkADRsTbzr1Gbld2awIslmqQ",
    authDomain: "alwaysassistant-2d1ed.firebaseapp.com",
    projectId: "alwaysassistant-2d1ed",
    storageBucket: "alwaysassistant-2d1ed.appspot.com",
    messagingSenderId: "589903049578",
    appId: "1:589903049578:web:b544637ceb1b1e53bceb13"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export const signIn = async () =>{
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(user){
          
        }

    }
    catch(error){
      console.log(error);
    }
  }


  export const logOut = async() =>{
    try{
      await signOut(auth);
    }
    catch(error){
      console.log(error);
    }
  }