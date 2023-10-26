import { useState, useRef, useEffect } from 'react'
import ToDoItem from "./ToDoItem"
import {Todo} from "../model"
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    borderRadius: '3px',
    border: '1px solid black',
    height: '77%', 
    minWidth: '25em',
    // boxShadow: '0px 0px 30px 8px rgb(156, 168, 178)',
  },
  add_task: {
    fontSize: 'large',
    margin: 0,
    padding: 0,
    minWidth: 0, 
    minHeight: 0
  },
  todos_box: {
    height: '90%',
    width: '100%',
    overflowY: 'auto',
  }, 
  date: {
    backgroundColor: 'rgb(245, 245, 250)',
    display: 'flex', 
    justifyContent: 'space-between',
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
  handleToggle: (id: number) => void
  currentDate: Date
  getPrevDate: () => void
  getNextDate: () => void

}

const ToDoList: React.FC<Props> = ({todos, addTodo, updateTodo, deleteTodo, handleToggle, currentDate, getPrevDate, getNextDate}) => {

  const displayDate = {
    dow: currentDate.toLocaleString('default', {weekday: 'long'}),
    month: currentDate.toLocaleString('default', {month: 'short'}), 
    day: currentDate.getDate(),
    year: currentDate.getFullYear(), 
  }

  return (
    <Box sx={todolistStyles.todo_list} p={3} m={1}>
        <Box sx={todolistStyles.todo_heading}>
          <Typography variant='h4' > Todo List </Typography>
          <Button sx={todolistStyles.add_task} onClick={()=> addTodo('')}> <AddIcon /> </Button>
        </Box> 
        <Box sx={todolistStyles.date}>
          <Button onClick={()=>getPrevDate()}> <ArrowBackIosIcon/> </Button> 
          <Typography> {displayDate.dow}, {displayDate.month} {displayDate.day} {displayDate.year}  </Typography>
          <Button onClick={()=>getNextDate()}> <ArrowForwardIosIcon/> </Button> 
        </Box>

       <Box 
        sx={todolistStyles.todos_box}
        >
          {todos.map((todo) => (
                <ToDoItem key={todo.id} todo={todo} handleToggle={handleToggle} updateTodo={updateTodo} deleteTodo={deleteTodo}  />
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
