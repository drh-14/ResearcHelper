import { AppBar, Box, Typography, Button, Toolbar } from '@mui/material';
import Image from "next/image";
import { signIn, logOut } from './firebase';
import { User } from 'firebase/auth';

interface ButtonAppBarProps{
  user: User | null;
}

export const ButtonAppBar: React.FC<ButtonAppBarProps> = ({user}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">  
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AlwaysAssistant
          </Typography>
          
          {(user && user.photoURL)?<div className = 'flex flex-col justify-center items-center invisible hover:visible'>
            <Image className = 'visible' width = '50' height = '50' src = {user.photoURL} alt = 'profile'></Image>
            <Button onClick = {logOut} variant = 'contained' className = 'absolute top-14 w-max'>Log Out</Button></div>:
            <Button onClick = {signIn} color="inherit">Login</Button>}
        </Toolbar>  
      </AppBar>
    </Box>
  )
};

