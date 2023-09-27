import { useState, useRef, useEffect } from 'react'
import { Todo } from "../model"
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';


const todoItemStyles = {
  box: {
    border: '1px solid black',
    borderRadius: '3px',
    display: 'flex',
    alignItems:'center',
  }, 
  textfield: {
    backgroundColor: 'white',
    border: 'none',"& fieldset": { border: 'none' }
  }
}

interface Props {
  todo: Todo,
  toggleTodo: (id: number) => void,
  onInputChange: (id: number,  value:string) => void
}

const ToDoItem: React.FC<Props> = ({todo, toggleTodo, onInputChange}) => {

    const [inputValue, setInputValue] = useState<string>(todo.taskName);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>  {
      const {value} = e.target
      setInputValue(value)
      onInputChange(todo.id,value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('submitting')
    }

    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={todoItemStyles.box} 
        m={2} 
        >
        <Checkbox checked={todo.completed} onClick={()=> toggleTodo(todo.id)} /> 
           {!todo.completed ? 
           <TextField 
              variant='outlined'
              type="text" 
              id={`${todo.id}`}
              value={inputValue}
              onChange={handleInputChange}
              required
              // label="first name"
              fullWidth
              sx={todoItemStyles.textfield}
            /> :
            <Typography> {inputValue} </Typography>
           }
      </Box>
    )
  }
  
  export default ToDoItem;
  