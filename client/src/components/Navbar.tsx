import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'; 


export default function ButtonAppBar() {

    const [ token, setToken ] = useState(""); 
    const navigate = useNavigate();


    useEffect(() => {
        const tok = localStorage.getItem('token')
        if (tok !== null) {
            setToken(tok)
        }
      }, [])

    function handleLogout(): void  {
        localStorage.removeItem('token')
        navigate('/');
    }
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaskAI 
          </Typography>
          {token ? <Button color="inherit" onClick={handleLogout} > Logout </Button> : 
          <div> 
          <Button variant="outlined" color="inherit" onClick={() => navigate("/register")}> Register </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}> Login </Button> 
          </div> } 
        </Toolbar>
      </AppBar>
    </Box>
  );
}