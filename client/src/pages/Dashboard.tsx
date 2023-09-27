import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import VirtualAssistant from '../components/VirtualAssistant';
import Button from '@mui/material/Button';
import axios from "axios";



const dashboardStyles = {

}

const Dashboard: React.FC = () => {

  const token = localStorage.getItem('token')

  const navigate = useNavigate();

    // useEffect(() => {
    //     const tok = localStorage.getItem('token')
    //     const id = localStorage.getItem('id') 
    //     if (!tok || tok !== 'undefined' && !id || id !== undefined) {
    //         setToken(tok)
    //         setuserId(id)
    //     }
    //   }, [token])

    function handleLogout(): void  {
        // localStorage.removeItem('token')
        localStorage.clear
        navigate('/');
    }

  return (
    <>
      {/* <Sidebar/> */}
      <ToDoList/>
      <VirtualAssistant/>
      {token ? <Button color="inherit" onClick={handleLogout} > Logout </Button> : <> </> }
    {/* </Box> */}
    </>
  )
}

export default Dashboard;
