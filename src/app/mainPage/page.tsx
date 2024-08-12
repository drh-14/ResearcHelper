'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { ButtonAppBar }  from '../components';
import { Box, Button } from '@mui/material';
import { onAuthStateChanged, User } from  'firebase/auth';
import { db, auth } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';

export default function Home() {
  const router = useRouter();
  const introMessage = `Hi! I provide information about research at Stony Brook and guide you to start getting involved with research. How can I help you today?`
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [fullMessage, setFullMessage] = useState<string>('');
  const [user, setUser] = useState<User| null>(null);
  const [messageList, setMessageList] = useState([`${introMessage}`]);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null); 
  

 useEffect(() =>{
  const unsubscribe = onAuthStateChanged(auth, (user) =>{
    if(user){
      setUser(user);
    }
    else{
      setUser(null);
      router.push('/');
    }
  });

  return () => unsubscribe();
 },[])

 const loadMessages = async () =>{
  if(user && user.email){
    const docRef = doc(db, 'users', user.email)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const { messages } = docSnap.data();
      messages.forEach( (msg:string) =>{
           setMessageList(prevList => [...prevList, msg]);
      })
    }
  
  }
};

 useEffect( () =>{
  loadMessages();
 }, [user]);

 useEffect( () =>{
  if(endOfMessagesRef.current){
    endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }
 }, [messageList])

 const sendMessage = async (e: React.FormEvent | React.KeyboardEvent) => {
  setLoading(true);
  if (message) {
    setMessageList(prevList => [...prevList, message]);
    setMessageList(prevList => [...prevList, '']);

    if (user && user.email) {
      const docRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const currMessages = data?.messages || [];
     
        await setDoc(docRef, { messages: [...currMessages, message] }, { merge: true });
      }
    }

    setMessage('');
    try{
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
    });

    const reader = response.body?.getReader();
    setLoading(false);
    if (reader) {
      const decoder = new TextDecoder();
      let aiMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done){
          if (user && user.email) {
            const docRef = doc(db, 'users', user.email);
            const docSnap = await getDoc(docRef);
      
            if (docSnap.exists()) {
              const data = docSnap.data();
              const currMessages = data?.messages || [];
           
              await setDoc(docRef, { messages: [...currMessages, aiMessage] }, { merge: true });
            }
          }
          setMessageList(prevList => {
            const newList = [...prevList];
            newList[newList.length - 1] = aiMessage;
            return newList;
          });

           break;
        } 
        aiMessage += decoder.decode(value, { stream: true });
        setMessageList(prevList => {
          const newList = [...prevList];
          newList[newList.length - 1] = aiMessage;
          return newList;
        });
        const delay = () => new Promise((resolve) => setTimeout(resolve, 0));
        await delay();
      }
    }
  }
  catch(error){
    console.log(error);
  }
}
};

  return (
    <main>
      <ButtonAppBar user = {user}></ButtonAppBar>
      <div className = 'flex mt-32 justify-center flex-col gap-4 items-center'>
      <Box  className = 'w-4/12 border rounded-lg border-black overflow-auto' sx = {{height: '70vh', maxHeight: '70vh'}}>
      <div className = 'flex flex-col gap-4 ml-4 mr-4 mt-4 mb-4'>
      {messageList.map((message, index) =>(index % 2 === 0)? <div ref = {endOfMessagesRef} key = {index} className =  'p-4 rounded-md bg-blue-500 text-white max-w-max'>
        {(loading && index === messageList.length - 1)? <ThreeDots height = '10' width = '30' color = 'white'></ThreeDots>: <h1>AI: {message}</h1>}</div>
      :<div key = {index} ref = {endOfMessagesRef} className = 'p-4 rounded-md bg-green-500 text-white max-w-max ml-auto'>You: {message}</div>)}
      </div>

      </Box>
      <div className = 'flex justify-start justify-items-start gap-4 w-4/12 p-2'>
        <input type = 'text' value = {message} onChange={(e) => setMessage(e.target.value)} onKeyDown = {(e:React.KeyboardEvent) => {
          if(e.key === 'Enter'){
            sendMessage(e);
          }
        }} className = 'p-4 border border-black rounded-md w-full' placeholder = 'Message'></input>
        <Button className = 'pt-1 pb-1' variant = 'contained' onClick = {sendMessage}>Send</Button>
      </div>
      </div>
    </main>
  );
}