import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import Button from '@mui/material/Button'; 
import Navbar from "../components/Navbar";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Sidebar from '../components/Sidebar'; 


const dashboardStyles = {

}

const Dashboard: React.FC = () => {

  const navigate = useNavigate();
 
  return (
    <>
      {/* <Sidebar/> */}
      <ToDoList/>
    {/* </Box> */}
    </>
  )
}

export default Dashboard;
