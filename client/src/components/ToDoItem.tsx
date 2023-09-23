import { useState } from 'react'
import { Todo } from "../model"
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

const todoItemStyles = {
  box: {
    border: '1px solid black',
    borderRadius: '5px',
    display: 'flex',
    alignItems:'center'
  } 
}

interface Props {
  todo: Todo
}

const ToDoItem: React.FC<Props> = ({todo}) => {

    return (
      <Box sx={todoItemStyles.box} m={1} p={1}>
        <Checkbox /> <Typography > {todo.todo} </Typography>
      </Box>
    )
  }
  
  export default ToDoItem;
  