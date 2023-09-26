import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import Button from '@mui/material/Button';


const dashboardStyles = {
}

const Dashboard: React.FC = () => {

  const [ token, setToken ] = useState(""); 
  const navigate = useNavigate();


    useEffect(() => {
        const tok = localStorage.getItem('token')
        if (!tok || tok !== 'undefined') {

        }
      }, [token])

    function handleLogout(): void  {
        localStorage.removeItem('token')
        navigate('/');
    }
 
  return (
    <>
      {/* <Sidebar/> */}
      <ToDoList/>
      {token ? <Button color="inherit" onClick={handleLogout} > Logout </Button> : <> </> }
    {/* </Box> */}
    </>
  )
}

export default Dashboard;
