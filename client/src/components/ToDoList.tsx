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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '6px',
    height: '35em', 
    width: '36em',
    boxShadow: '0px 0px 40px 8px rgb(156, 168, 178)'
  },
  add_task: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    border: '1px solid black',
    borderRadius: '5px',
    width: '100%',
  },
  button: {
      '&:hover': {
       backgroundColor: '#6db3a4'
      },
       backgroundColor: '#84bfb2',
  },
  todos_box: {
    width: '100%'
  }
}

const fakeTodos: Todo[] = [
  { id: 1,  todo: 'Task 1: ', isDone: false},
  { id: 2, todo: 'Task 2: ', isDone: true},
  { id: 3,  todo: 'Task 3: ', isDone: false},
];
const ToDoList: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>(fakeTodos);  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(todos)
    // setTodos(todos.map((todo) => todo.id == id ? {...todo, todo: data.}))
  }

  return (
    <Box sx={todolistStyles.todo_list} p={5} m={2}>
        <Typography variant='h3' m={1} align='center'> Today's Priority Task </Typography>
        <Typography m={2} align='center'> What's the 3 most important tasks of the day? </Typography>
        {/* <Box sx={todolistStyles.add_task} p={1} >
          <AddIcon className="add_icon"/> Add Task
        </Box> */}
       <Box 
        component="form" 
        noValidate 
        autoComplete="off" 
        sx={todolistStyles.todos_box}
        m={2}
        p={1}
        onSubmit={handleSubmit} >
          {todos.map((todo) => (
              <ToDoItem todo={todo} toggleTodo={handleToggle} onInputChange={handleInputChange} />
          ))}  
        <Button variant="contained" type="submit" sx={todolistStyles.button}> Save </Button>   
      </Box>
        
    </Box>
  )
}

export default ToDoList;
