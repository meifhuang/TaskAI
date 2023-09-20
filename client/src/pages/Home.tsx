import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 



const Home: React.FC = () => {

  const navigate = useNavigate();

    return (
      <div>
          <h1> Home </h1>
          <Button variant="contained" color="success" onClick={() => navigate("/register")}> Register </Button>

          <Button variant="contained" color="primary" onClick={() => navigate("/login")}> Login </Button>
      </div>
    )
  }
  
  export default Home;
  