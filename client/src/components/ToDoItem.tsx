import { useState } from 'react'
import { Todo } from "../model"
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

const todoItemStyles = {
  box: {
    border: '1px solid black',
    borderRadius: '2px',
    display: 'flex',
    alignItems:'center'
  } 
}

interface Props {
  todo: Todo,
  toggleTodo: (id: number) => void;
}

const ToDoItem: React.FC<Props> = ({todo, toggleTodo}) => {

  const [editMode, setEditMode] = useState<boolean>(false); 

    return (
      <Box sx={todoItemStyles.box} m={1} p={1}>
        <Checkbox checked={todo.isDone} onClick={()=> toggleTodo(todo.id)} /> <Typography > {todo.todo} </Typography>
      </Box>
    )
  }
  
  export default ToDoItem;
  