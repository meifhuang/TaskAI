import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import Button from '@mui/material/Button'; 
import Navbar from "../components/Navbar";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';



const sidebarStyles = {

}

const Sidebar: React.FC = () => {

  const navigate = useNavigate();
 
  return (
    <Drawer
      anchor='left'
      open={true}
      variant='persistent'
      // onClose={toggleDrawer(anchor, false)
    >
      {
        <Typography variant='h5' m={3} p={1} align='left'> Mei Huang </Typography>
        
      }
    </Drawer>
  )
}

export default Sidebar;
