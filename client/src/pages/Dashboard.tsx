import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import VirtualAssistant from '../components/VirtualAssistant';
import Pomodoro from "../components/Pomodoro";
import Button from '@mui/material/Button';
import axios from "axios";
import {Todo} from "../model"


const dashboardStyles = {
}

const Dashboard: React.FC = () => {

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id'); 
  const [todos, setTodos] = useState<Todo[]>([]);  
  const [showTaskList, setShowTaskList] = useState<boolean>(false)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/${userId}`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response) {
          setTodos(response.data)
        }
      }
      catch(e) {
        console.error('Could not fetch tasks:', e);
      }
    }
    if (userId) {
      fetchTasks()
    }
    }, [userId])

  const addTodo = async (taskname: string) => {
    const task = {taskName: taskname, completed: false, userid: userId} 
    try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/task/add',
      data: task,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    if (response) {
      const newTask = response.data
      setTodos((prev) => [...prev, newTask]) 
    }
    else {
      throw Error('error')
    }
  }
  catch (e:any) {
    console.error(e.message)
  }
}

const deleteTodo = async ( id:number ) => {
  try {
    const response = await axios({
      method:'delete',
      url: `http://localhost:3000/task/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    if (response) { 
      console.log('Before:', todos);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      console.log('After:', todos);
    }
    else {
      throw Error('error')
    }
  }
  catch (e: any) {
    console.error(e.message)
  }
}

const handleToggle = async (id: number) => {
  try {
  const response = await axios({
    method: 'put',
    url: `http://localhost:3000/task/updatecheck/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })
  if (response) {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo ))
  }
}
catch (e) {
  console.error('Could not update')
}
}

const updateTodo = async (id: number, updatedTask: string) => {
  try {
    const response = await axios({
      method: 'put',
      url: `http://localhost:3000/task/update/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        value: updatedTask
      }
    })
    if (response) {
      let updatedTask = response.data.updatedTask
      setTodos(todos.map((todo) => todo.id === id ? {...todo, taskName: updatedTask} : todo ))
    }
  }
  catch (e) {
    console.error('Could not update')
  }
  }

  const openTaskList = () => {
    
    setShowTaskList(true)
  }

  const closeTaskList = () => {
   
    setShowTaskList(false)
  }

  const handleLogout = () => {
        localStorage.clear
        navigate('/');
  }

  return (
    <>
      {/* <Sidebar/> */}
      {showTaskList ? <ToDoList todos={todos} addTodo={addTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} handleToggle={handleToggle} /> : <> </>}
      <Pomodoro/> 
      <VirtualAssistant addTodo={addTodo} openTaskList={openTaskList} closeTaskList={closeTaskList}/>
      {token ? <Button color="inherit" onClick={handleLogout} > Logout </Button> : <> </> }
    {/* </Box> */}
    </>
  )
}

export default Dashboard;
