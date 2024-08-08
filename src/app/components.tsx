import { AppBar, Box, Typography, Button, Toolbar } from '@mui/material';
import Image from "next/image";
interface ButtonAppBarProps{
    loginFunction: () => void
}

export const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">  
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AlwaysAssistant
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>  
      </AppBar>
    </Box>
  )
};

