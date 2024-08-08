'use client'
import { useState, useEffect } from 'react';
import { ButtonAppBar }  from './components';
import { Box, Button } from '@mui/material';
import { onAuthStateChanged } from  'firebase/auth';
import { signIn } from './firebase';
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [AIMessage, setAIMessage] = useState({
    role: 'assistant',
    message: `Hi, I'm the Headstarter AI Support Agent. How can I help you today?`
  })



  const loadMessages = async () =>{
    //If user is logged in, load in messages, should be able to be accomplished with useEffect
  };

  const sendMessage = async () =>{
  };

  return (
    <main>
      <ButtonAppBar></ButtonAppBar>
      <div className = 'flex mt-32 justify-center flex-col gap-4 items-center'>
      <Box  className = 'w-4/12 border rounded-lg border-black' sx = {{height: '70vh'}}>
      <div className = 'flex flex-col gap-4 ml-4 mr-4 mt-4'>
      <div className = 'p-4 rounded-md bg-blue-500 text-white max-w-max break-all'>
      {AIMessage.message}</div>

      <div className = 'p-4 rounded-md bg-green-500 mt-4 text-white max-w-max ml-auto break-all'>
      <h1>testing my message</h1></div>
      </div>

      </Box>
      <div className = 'flex justify-start justify-items-start gap-4 w-4/12 p-2'>
        <input onChange={(e) => setMessage(e.target.value)} onSubmit = {sendMessage} className = 'p-4 border border-black rounded-md w-full' placeholder = 'Message'></input>
        <Button className = 'pt-1 pb-1' variant = 'contained' onSubmit = {sendMessage}>Send</Button>
      </div>
      </div>
    </main>
  );
}