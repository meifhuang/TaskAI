import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import Navbar from "../components/Navbar";


const Dashboard: React.FC = () => {

  const navigate = useNavigate();
 
  return (
    <>
    <Navbar/> 
    <h1> Dashboard</h1>
    </>
  )
}

export default Dashboard;
