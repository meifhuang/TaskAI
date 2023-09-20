// import { useState } from 'react'
import './App.css'
// import VirtualAssistant from "./components/VirtualAssistant"; 
// import ToDoList from "./components/ToDoList"; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register"; 
import Login from "./pages/Login"; 
import Dashboard from "./pages/Dashboard"; 

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
      <RouterProvider router={router} />
    )
}

export default App;
