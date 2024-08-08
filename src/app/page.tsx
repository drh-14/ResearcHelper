'use client'
import { useState, useEffect } from 'react';
import { ButtonAppBar }  from './components';
import { Box, Button } from '@mui/material';
import { onAuthStateChanged } from  'firebase/auth';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [AIMessage, setAIMessage] = useState({
    role: 'assistant',
    message: `Hi, I'm the Headstarter AI Support Agent. How can I help you today?`
  })

  const sendMessage = async () =>{
  };

  return (
    <main>
      <ButtonAppBar></ButtonAppBar>
      <div className = 'flex mt-32 justify-center flex-col gap-4 items-center'>
      <Box  className = 'w-4/12 border rounded-lg border-black' sx = {{height: '70vh'}}>
      <div className = 'p-4 rounded-md bg-blue-500 ml-2 mr-2 mt-4 text-white max-w-4/12'>
      {AIMessage.message}
      </div>
      </Box>
      <div className = 'flex justify-start justify-items-start gap-4 w-4/12 p-2'>
        <input onChange={(e) => setMessage(e.target.value)} onSubmit = {sendMessage} className = 'p-4 w-max border border-black rounded-md w-full' placeholder = 'Message'></input>
        <Button className = 'pt-1 pb-1' variant = 'contained' onSubmit = {sendMessage}>Send</Button>
      </div>
      </div>
    </main>
  );
}