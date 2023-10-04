import { useState, useRef, useEffect } from 'react'
import { Todo } from "../model"
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'; 
import ClearIcon from '@mui/icons-material/Clear';
import ModeIcon from '@mui/icons-material/Mode';
import CheckIcon from '@mui/icons-material/Check';


const todoItemStyles = {
  box: {
    border: '1px solid black',
    borderRadius: '4px',
    display: 'flex',
    alignItems:'center'
  }, 
  textfield: {
    width: '18em',
    backgroundColor: 'white',
    // border: 'none',"& fieldset": { border: 'none' },
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
  }
  },
  buttons: {
    display: 'flex'
  },
  button: {
    padding: .3,
    margin: .1,
    minHeight: 0,
    minWidth: 0,
  },
  icon: {
    fontSize: 'x-large'
  },
}

interface Props {
  todo: Todo,
  handleToggle: (id: number) => void,
  updateTodo: (id: number, updatedTaskName: string) => void
  deleteTodo: (id: number) => void
}

const ToDoItem: React.FC<Props> = ({todo, handleToggle, updateTodo, deleteTodo}) => {

    const [inputValue, setInputValue] = useState<string>(todo.taskName);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleCheck = () => {
      handleToggle(todo.id)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
      const {value} = e.target
      setInputValue(value)
    }

    const toggleEditOn = () => {
      setEditMode(true)
    }

    const handleToggleOff = () => {
      updateTodo(todo.id, inputValue)
      setEditMode(false)
    }

    const handleDeleteTask = () => {
      deleteTodo(todo.id)
    }

    return (
      <Box
        sx={todoItemStyles.box} my={1}>
          <Checkbox checked={todo.completed} onClick={handleCheck} /> 
            {editMode ? 
           <TextField 
              variant='standard'
              type="text" 
              id={`${todo.id}`}
              value={inputValue}
              onChange={handleInputChange}
              required
              fullWidth
              sx={todoItemStyles.textfield}
            /> :
            <Typography sx={todoItemStyles.textfield}> {inputValue} </Typography>
            }
            <Box sx={todoItemStyles.buttons} m={1}>
            {!editMode ? 
              <Button sx={todoItemStyles.button} variant="outlined" size="small" onClick={()=> toggleEditOn()}> 
                  <ModeIcon sx={todoItemStyles.icon} /> 
              </Button> :
              <Button sx={todoItemStyles.button} variant="outlined" size="small" onClick={handleToggleOff}> 
                  <CheckIcon sx={todoItemStyles.icon} />
              </Button>
              } 
              <Button sx={todoItemStyles.button} variant="outlined" size="small" onClick={handleDeleteTask}> 
              <ClearIcon sx={todoItemStyles.icon}/> 
              </Button> 
            </Box> 
      </Box>
    )
  }
  
  export default ToDoItem;
  