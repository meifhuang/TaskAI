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
    borderRadius: '3px',
    display: 'flex',
    alignItems:'center',
    // justifyContent: 'center',
  }, 
  textfield: {
    backgroundColor: 'white',
    // border: 'none',"& fieldset": { border: 'none' },
    width: '100%'
  },
  editButton: { 
    margin: '.4em'
  },
  deleteButton: {
    margin: '.4em'
  },
  checkButton: {
    margin: '.4em'
  }
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
        sx={todoItemStyles.box} 
        m={2} 
        >
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
            {!editMode ? 
            <Button onClick={()=> toggleEditOn()}> 
                <ModeIcon  sx={todoItemStyles.editButton}/> 
            </Button> :
            <Button onClick={handleToggleOff}> 
                <CheckIcon sx={todoItemStyles.checkButton}/>
            </Button>
             } 
            <Button onClick={handleDeleteTask}> <ClearIcon sx={todoItemStyles.deleteButton}/> </Button> 

      </Box>
    )
  }
  
  export default ToDoItem;
  