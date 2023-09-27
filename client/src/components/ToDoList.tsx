import { useState } from 'react'
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
    width: '100%',
    height: '90%',
  }, 
  date: {
    backgroundColor: 'rgb(245, 245, 250)',
    display: 'flex', 
    // justifyContent: 'center',
    // alignItems: 'center',
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

const fakeTodos: Todo[] = [];
const ToDoList: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>(fakeTodos);  
  const date = new Date();
  const dow = date.toLocaleString('default', {weekday: 'long'})
  const month = date.toLocaleString('default', {month: 'short'})
  const day = date.getDate()
  const year = date.getFullYear()

//   const handleAdd = (e: React.FormEvent) => {
//     e.preventDefault()
//     setTodos((prev) => [...prev, {id: Date.now(), todo: todo, isDone: false, showInput: true}])
// }

  const handleToggle = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo ))
  }

  const handleInputChange = (id: number, value: string) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, todo: value} : todo))
  }

  const handleAddTask = () => {
    setTodos((prev) => [...prev, {id: Date.now(), todo: '', isDone: false}])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(todos)
    // setTodos(todos.map((todo) => todo.id == id ? {...todo, todo: data.}))
  }

  return (
    <Box sx={todolistStyles.todo_list} p={5} m={2}>
        <Box sx={todolistStyles.todo_heading}>
          <Typography variant='h3'> Today </Typography>
          <Button sx={todolistStyles.add_task} onClick={handleAddTask}> <AddIcon /> </Button>
        </Box> 

        <Box sx={todolistStyles.date}>
        <Typography> {dow}, {month} {day} </Typography>
        </Box>

       <Box 
        component="form" 
        noValidate 
        autoComplete="off" 
        sx={todolistStyles.todos_box}
        onSubmit={handleSubmit} >
          {todos.map((todo) => (
              <ToDoItem todo={todo} toggleTodo={handleToggle} onInputChange={handleInputChange} />
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
