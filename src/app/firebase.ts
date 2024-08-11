import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, setDoc, getDocs, getDoc, doc, collection, query } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBfPzS05M9HkADRsTbzr1Gbld2awIslmqQ",
    authDomain: "alwaysassistant-2d1ed.firebaseapp.com",
    projectId: "alwaysassistant-2d1ed",
    storageBucket: "alwaysassistant-2d1ed.appspot.com",
    messagingSenderId: "589903049578",
    appId: "1:589903049578:web:b544637ceb1b1e53bceb13"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth();
  const provider = new GoogleAuthProvider();
  export const db = getFirestore(app);

  export const signIn = async () =>{
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const email:string = (user && user.email)? user.email: '';
        const docRef = doc(db, 'users', email)
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()){
          await setDoc(doc(db, 'users', email), {
            messages: []

        });
    }
  }
    catch(error){
      console.log(error);
    }            
  };
  
  export const logOut = async() =>{
    try{
      await new Promise(resolve => setTimeout(resolve, 200));
      await signOut(auth), 1000;
    }
    catch(error){
      console.log(error);
    }
  }
