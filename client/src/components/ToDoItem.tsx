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
  handleSubmitInput: (e: React.FormEvent,  id:number) => void
}

const ToDoItem: React.FC<Props> = ({todo, handleToggle, updateTodo, handleSubmitInput}) => {

    const [inputValue, setInputValue] = useState<string>(todo.taskName);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
      const {value} = e.target
      setInputValue(value)
    }

    const handleToggleOff = () => {
      updateTodo(todo.id, inputValue)
      setEditMode(false)
    }

    // const handleSubmit = async (e: React.FormEvent, id: number) => {
    //     e.preventDefault()
    //     console.log('submitting')
    //     setEditMode(false)
    // }

    const toggleEditOn = () => {
      setEditMode(true)
    }

    return (
      <Box
        component="form"
        sx={todoItemStyles.box} 
        m={2} 
        >
          <Checkbox checked={todo.completed} onClick={()=> handleToggle(todo.id)} /> 
            {editMode ? 
           <TextField 
              variant='standard'
              type="text" 
              id={`${todo.id}`}
              value={inputValue}
              onChange={handleInputChange}
              required
              // label="first name"
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
            <Button > <ClearIcon sx={todoItemStyles.deleteButton}/> </Button> 

      </Box>
    )
  }
  
  export default ToDoItem;
  