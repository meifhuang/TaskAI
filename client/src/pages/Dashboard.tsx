import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoList from '../components/ToDoList';
import VirtualAssistant from '../components/VirtualAssistant';
import Habits from "../components/Habits";
import Pomodoro from "../components/Pomodoro";
import BasicModal from "../components/BasicModal";
import Sidebar from "../components/Sidebar";
import Button from '@mui/material/Button';
import axios from "axios";
import {Todo} from "../model"
import music from "../assets/todo.mp3";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


const dashboardStyles = {
  box: {
    width: '100vw',
    border: '2px solid blue',
    height: '100vh',
    // backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    // border: '2px solid black'
    margin: 0, 
    padding: 0,
  },
  dash: {
    display: 'flex',
    height: '100%'
    // justifyContent: 'space-around',
  },
  columnOne: {
    height: '100%'
  },
}

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  //user
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id'); 

   //date 
   const [currentDate, setCurrentDate] = useState(new Date());

   const getPrevDate = () => {
     const prevDay = new Date(currentDate)
     prevDay.setDate(prevDay.getDate()-1)
     console.log('click', prevDay)
     setCurrentDate(prevDay)
   }
 
   const getNextDate = () => {
     const nextDay = new Date(currentDate)
     nextDay.setDate(nextDay.getDate()+1)
     setCurrentDate(nextDay)
   }

  //tasks
  const [todos, setTodos] = useState<Todo[]>([]);  

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
    const task = {taskName: taskname, completed: false, userid: userId, createdFor: currentDate} 
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
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
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
  //widget visibility 

  interface Widgets {
    [key: string]: boolean;
  }

  const widgets: Widgets = {
    'task': true,
    'timer': true,
    'assistant': true,
    'habits': true
  }

  const [showWidget, setShowWidget] = useState(widgets)

  const toggleWidget = (widgetUpdate: string) => {
    setShowWidget(prevWidget => (
      {...prevWidget, 
       [widgetUpdate]: !prevWidget[widgetUpdate] 
      }))
  }

 

  return (
    <Box sx={dashboardStyles.box}>
       {/* <Box sx={dashboardStyles.title} p={2}> 
        <Typography variant="h3"> TaskAI </Typography>
       </Box>  */}
       <Box sx={dashboardStyles.dash} m={1}> 
       <Sidebar toggleWidget={toggleWidget} />       
        <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen}/>
        {showWidget["task"] ? <ToDoList getNextDate={getNextDate} getPrevDate={getPrevDate} currentDate={currentDate} todos={todos} addTodo={addTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} handleToggle={handleToggle} /> : <> </>}
        <Box sx={dashboardStyles.columnOne}>
        {showWidget["timer"] ? <Pomodoro isRunning={isRunning} mode={mode} seconds={seconds} startStopTimer={startStopTimer} handleButtonToggle={handleButtonToggle} resetTime={resetTime} handleOpen={handleOpen} handleClose={handleClose} /> : <> </>}
        {showWidget["habits"] ? <Habits/> : <></>}
        </Box>
        {showWidget["assistant"] ?  <VirtualAssistant handleButtonToggle={handleButtonToggle} mode={mode} resetTime={resetTime} startStopTimer={startStopTimer} addTodo={addTodo}/> : <></>}  
      
      </Box>
      </Box>
  )
}

export default Dashboard;
