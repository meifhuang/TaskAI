// import { useState } from 'react'
import './App.css'
// import VirtualAssistant from "./components/VirtualAssistant"; 
// import ToDoList from "./components/ToDoList"; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register"; 
import Login from "./pages/Login"; 
import Dashboard from "./pages/Dashboard"; 
import Container from '@mui/material/Container';
import Background from './assets/background.jpg'; 

const containerStyles = {
  container: {
  height: '100vh',
  display: 'flex', 
  justifyContent:'center', 
  alignItems: 'center',
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  }
}

const App: React.FC = () => {
 
    const router = createBrowserRouter([
      {
        path: "/", 
        element: <Home/>,
      },
      {
        path: "/register",
        element: <Register/>
       },
       {
        path: "/login",
        element: <Login/>
       },
       {
        path: "/dashboard",
        element: <Dashboard/>
       }
    ])
  
    return (
      <Container sx={containerStyles.container} maxWidth='xl'> 
      <RouterProvider router={router} />
      </Container>
    )
}

export default App;
