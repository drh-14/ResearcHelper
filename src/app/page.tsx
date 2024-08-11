'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signIn } from './firebase';

export default function Home() {
  const router = useRouter();
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if(user){
        router.push('/mainPage');
      }
      
  })

   return () => unsubscribe();
   }, []);

  return (
    <main>
      <div className = 'flex justify-end w-full'>
      <Button onClick = {signIn} className = 'mt-2 mr-4 p-4' variant = 'outlined'>Sign in</Button>
      </div>
      <div className = 'flex flex-col justify-center items-center text-center gap-20 mt-24'>
      <div className='flex justify-center text-4xl'>Introducing ResearchHelper, a chatbot to help assist you with finding research</div>
      <div className = 'flex flex-col gap-4 text-2xl text-center'>
      <Box>Do you go to Stony Brook and want to get involved in research? Great!</Box>
      <Box>But sometimes it's hard... Lots of students have no idea where to start or who to find first.</Box>
      </div>
      <div className = 'text-3xl'>If this sounds like you, then ResearchHelper can help you! Get started today.</div>
      <Button onClick = {signIn} className = 'w-1/12 p-4' variant = 'contained'>Get started</Button>
      </div>
    </main>
  );
}