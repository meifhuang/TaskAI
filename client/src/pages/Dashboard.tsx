import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 


const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  function handleLogout(): void  {
      localStorage.removeItem('token')
      navigate('/');
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate])

  return (
    <>
    <h1> Dashboard</h1>
    <Button variant="contained" onClick={handleLogout}> Logout </Button>
    </>
  )
}

export default Dashboard;
