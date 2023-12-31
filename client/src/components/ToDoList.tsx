import { useState, useEffect } from 'react'
import ToDoItem from "./ToDoItem"
import {Todo} from "../model"
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import axios from "axios"; 

const todolistStyles = {
  todo_list: {
    display: 'flex', 
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '6px',
    height: '600px', 
    minWidth: '500px',
    boxShadow: '0px 0px 30px 8px rgb(156, 168, 178)',
  },
  add_task: {
    fontSize: 'large',
  },
  todos_box: {
    height: '90%',
  }, 
  date: {
    backgroundColor: 'rgb(245, 245, 250)',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    color: 'rgb(119, 142, 201)',
    margin: '0',
  },
  todo_heading: {
    borderBottom: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}

const ToDoList: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);  
  const userId = localStorage.getItem('id'); 
  
  const date = new Date();
  const dow = date.toLocaleString('default', {weekday: 'long'})
  const month = date.toLocaleString('default', {month: 'short'})
  const day = date.getDate()
  const year = date.getFullYear()

//   const handleAdd = (e: React.FormEvent) => {
//     e.preventDefault()
//     setTodos((prev) => [...prev, {id: Date.now(), todo: todo, isDone: false, showInput: true}])
// }
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

  const handleToggle = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo ))
  }

  // const handleInputChange = (id: number, value: string) => {
  //   console.log(id, value);
  //   setTodos(todos.map((todo) => todo.id === id ? {...todo, taskName: value} : todo))
  // }

  const addTask = async () => {
      const task = {id: Date.now(), taskName: '', completed: false, userid: userId}
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

  const updateTodo = (id: number, updatedTask: string) => {
    setTodos(todos.map((todo) => todo.id == id ? {... todo, taskName: updatedTask} : todo))
  }

  const handleSubmit = async (e: React.FormEvent, id:number) => {
    e.preventDefault()
    setTodos(todos.map((todo) => todo.id == id ? {...todo, taskName: todo.taskName, completed: todo.completed}:todo))
    console.log(todos)
  }

  return (
    <Box sx={todolistStyles.todo_list} p={3} m={1}>
        <Box sx={todolistStyles.todo_heading}>
          <Typography variant='h3'> Today </Typography>
          <Button sx={todolistStyles.add_task} onClick={addTask}> <AddIcon /> </Button>
        </Box> 

        <Box sx={todolistStyles.date}>
        <Typography> {dow}, {month} {day} </Typography>
        </Box>

       <Box 
        sx={todolistStyles.todos_box}
        >
          {todos.map((todo) => (
              <ToDoItem todo={todo} handleToggle={handleToggle} updateTodo={updateTodo} handleSubmitInput={handleSubmit} />
          ))}  

        {/* <Box sx={todolistStyles.add_task} p={1} >
          <AddIcon className="add_icon"/>
          <Typography m={1}> Add Task </Typography> 
        </Box> */}

        {/* <Button variant="contained" type="submit" sx={todolistStyles.button}> Save </Button>    */}
      </Box>
        
    </Box>
  )
}

export default ToDoList;
