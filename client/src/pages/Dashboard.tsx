import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';

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
