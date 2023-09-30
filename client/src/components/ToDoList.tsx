import { useState, useRef, useEffect } from 'react'
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
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    // borderRadius: '6px',
    border: '1px solid black',
    height: '30em', 
    width: '32em',
    flexShrink: '2'
    // boxShadow: '0px 0px 30px 8px rgb(156, 168, 178)',
  },
  add_task: {
    fontSize: 'large',
  },
  todos_box: {
    height: '90%',
    width: '100%',
    overflowY: 'auto',

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
interface Props {
  todos: Todo[],
  addTodo: (value: string) => void
  updateTodo: (id: number, updatedTaskName: string) => void
  deleteTodo: (id: number) => void
  handleToggle: (id: number) => void,
}


const ToDoList: React.FC<Props> = ({todos, addTodo, updateTodo, deleteTodo, handleToggle}) => {

  const date = new Date();
  const dow = date.toLocaleString('default', {weekday: 'long'})
  const month = date.toLocaleString('default', {month: 'short'})
  const day = date.getDate()
  const year = date.getFullYear()


  return (
    <Box sx={todolistStyles.todo_list} p={3} m={1}>
        <Box sx={todolistStyles.todo_heading}>
          <Typography variant='h4'> Today </Typography>
          <Button sx={todolistStyles.add_task} onClick={()=> addTodo('')}> <AddIcon /> </Button>
        </Box> 

        <Box sx={todolistStyles.date}>
        <Typography> {dow}, {month} {day} </Typography>
        </Box>

       <Box 
        sx={todolistStyles.todos_box}
        >
          {todos.map((todo) => (
                <ToDoItem todo={todo} handleToggle={handleToggle} updateTodo={updateTodo} deleteTodo={deleteTodo}  />
      
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
