'use client'
import React, { useState, useEffect } from 'react';
import { ButtonAppBar }  from './components';
import { Box, Button } from '@mui/material';
import { onAuthStateChanged, User } from  'firebase/auth';
import { auth } from './firebase';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState([`Hi, I'm the Headstarter AI Support Agent. How can I help you today?`]);
  const [user, setUser] = useState<User| null>(null);

 useEffect(() =>{
  const unsubscribe = onAuthStateChanged(auth, (user) =>{
    if(user){
      setUser(user);
    }
    else{
      setUser(null);
    }
  });

  return () => unsubscribe();
 },[])

  const loadMessages = async () =>{
    //If user is logged in, load in messages, should be able to be accomplished with useEffect
  };

  const sendMessage = (e:React.FormEvent | React.KeyboardEvent) =>{
    e.preventDefault();
    if(message){
    setMessageList(prevList => [...prevList, message]);
    setMessage('');
    }
  };

  return (
    <main>
      <ButtonAppBar user = {user}></ButtonAppBar>
      <div className = 'flex mt-32 justify-center flex-col gap-4 items-center'>
      <Box  className = 'w-4/12 border rounded-lg border-black' sx = {{height: '70vh'}}>
      <div className = 'flex flex-col gap-4 ml-4 mr-4 mt-4'>
      {messageList.map((message, index) => <div key = {index} className =  {(index % 2 === 0)? 'p-4 rounded-md bg-blue-500 text-white max-w-max break-all':
      'p-4 rounded-md bg-green-500 text-white max-w-max ml-auto break-all'
      }>{message}</div>             
      )}
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