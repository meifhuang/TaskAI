import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Insights } from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'; 


const sidebarStyles = {
  sidebar: {
    backgroundColor: 'white', 
    border: '2px solid gray',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%'
  },
  icon: {
    "& button": {
      margin: .4, 
      padding: 1.5,
      minWidth: 0,
      minHeight: 0,
      border: '1px solid gray',
      // fontSize: 'inherit'
    },
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    fontSize: 'inherit'
  },
  logout: {
      margin: '.1em',
      padding: '.1em',
      fontSize: 'inherit'
  },
  button: {

  }
}

interface Props {
  toggleWidget: (widgetUpdate: string) => void
}

const Sidebar: React.FC<Props> = ({toggleWidget}) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id'); 

  
  const handleLogout = () => {
    localStorage.clear
    navigate('/');
 }

 
  return (
    <Box sx={sidebarStyles.sidebar}>
      <Box sx={sidebarStyles.icon}> 
        <Typography variant="h6" align="center"> TaskAI </Typography>
        <Button sx={sidebarStyles.button} onClick={()=> toggleWidget('task')}> <ListIcon /> </Button>
        <Button sx={sidebarStyles.button} onClick={()=> toggleWidget('timer')} > <AccessAlarmIcon /> </Button>
        <Button sx={sidebarStyles.button} onClick={()=> toggleWidget('habits')}> <Insights /> </Button>
        <Button sx={sidebarStyles.button} onClick={()=> toggleWidget('assistant')}> <KeyboardVoiceIcon /> </Button> 
      </Box>
      <Box sx={sidebarStyles.logout}>
      {token ? <Button onClick={handleLogout} > <LogoutIcon/> </Button> : <> </>}
          {/* {token ? <Button color="inherit" onClick={handleLogout} > Logout </Button> : <> </> } */}
      </Box>
    </Box>
  )
}

export default Sidebar;
