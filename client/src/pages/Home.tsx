import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../assets/background.jpg'; 
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


const homeStyles = {
  container: {
    height: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
}

const Home: React.FC = () => {

  const navigate = useNavigate();

    return (
      <Container sx={homeStyles.container} maxWidth='xl'>
          <Button onClick={()=> navigate('/login')}> Login </Button>
      </Container>
    )
  }
  
  export default Home;
  