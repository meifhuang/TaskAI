import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import VirtualAssistant from '../components/VirtualAssistant';
import Pomodoro from "../components/Pomodoro";
import BasicModal from "../components/BasicModal";
import Button from '@mui/material/Button';
import axios from "axios";
import {Todo} from "../model"
import music from "../assets/todo.mp3";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';



const dashboardStyles = {
  box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid black'
  },
  title: {
  },
  dash: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'start',
    border: '1px solid red',
    flexShrink: '0'
  },
  sidebar: {
    backgroundColor: 'white', 
    border: '1px solid blue',
    height: '95%',
    boxSizing: 'border-box',
  },
  mid: {
    flexShrink: '1'
  },
  right: {
    flexShrink: '1'
  }
 
}

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  //user
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id'); 

  const handleLogout = () => {
    localStorage.clear
    navigate('/');
}

  //tasks
  const [todos, setTodos] = useState<Todo[]>([]);  
  const [showTaskList, setShowTaskList] = useState<boolean>(true)

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

  //clock 
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(25*60);
  const [mode, setMode] = useState('pomo');

  //modal + ringer
  const [open, setOpen] = useState<boolean>(false);
  const [audioOn, setAudioOn] = useState<boolean>(false);
  const audio = new Audio(music);

    useEffect(() => {
        let intervalId: number; 

        if (isRunning && seconds > 0) {
            intervalId = setInterval(()=> {
                setSeconds(seconds - 1)
            }, 1000)
        }
        else if (seconds === 0) {
              setIsRunning(false)
              handleOpen()
              setAudioOn(true)
              playAlarm()
        }
        return () => {
            clearInterval(intervalId);
        }
    },[seconds,isRunning])

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setAudioOn(false)
    resetTime(mode);
    audio.pause();
  }

    const playAlarm = () => {
        if (audioOn) {
          audio.loop = true
          audio.play()
        }
        else {
          audio.pause()
        }
    };

    const startStopTimer = () => {
        if (isRunning) {
          setIsRunning(false)
        }
        else {
          setIsRunning(true)
        }
    };

    const handleButtonToggle = (e: React.MouseEvent<HTMLElement> | null,  newValue:string) => {
        if (newValue !== null) { 
        setMode(newValue)
        resetTime(newValue)
        }
    };
    
    const resetTime = (newMode: string) => {
        setIsRunning(false)
        setSeconds(prevSeconds => {
            if (newMode === 'pomo') {
              return 25 * 60;
            } 
            else if (newMode === 'long') {
              return 10 * 60;
            } 
            else if (newMode === 'short') {
              return 5 * 60;
            }
            return prevSeconds;  
    })
  }

  return (
    <Box sx={dashboardStyles.box} m={1}>
       <Box sx={dashboardStyles.title} m={1} p={1}> 
        <Typography variant="h3"> TaskAI </Typography>
       </Box> 
       <Box sx={dashboardStyles.dash}> 
        <Box sx={dashboardStyles.sidebar} m={1}>
            <Typography variant="h1"> HELLO </Typography>
            <Typography variant="h1"> HELLO </Typography>
            <Typography variant="h1"> HELLO </Typography>
            <Typography variant="h1"> HELLO </Typography>
            {token ? <Button color="inherit" onClick={handleLogout} > Logout </Button> : <> </> }
        </Box>
      <Box sx={dashboardStyles.mid}> 
        <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen}/>
        {showTaskList ? <ToDoList todos={todos} addTodo={addTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} handleToggle={handleToggle} /> : <> </>}
      </Box>
      <Box sx={dashboardStyles.right}> 
          <Pomodoro isRunning={isRunning} mode={mode} seconds={seconds} startStopTimer={startStopTimer} handleButtonToggle={handleButtonToggle} resetTime={resetTime} handleOpen={handleOpen} handleClose={handleClose} /> 
          <VirtualAssistant handleButtonToggle={handleButtonToggle} mode={mode} resetTime={resetTime} startStopTimer={startStopTimer} addTodo={addTodo}/>
        </Box>
      </Box>
      </Box>
  )
}

export default Dashboard;
