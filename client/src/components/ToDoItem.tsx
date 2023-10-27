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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


const todoItemStyles = {
  box: {
    border: '1px solid black',
    borderRadius: '4px',
    display: 'flex',
    alignItems:'center',
    width: '24.5em'
  }, 
  textfield: {
    width: '10em',
    backgroundColor: 'white',
    // border: 'none',"& fieldset": { border: 'none' },
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
  }
  },
  buttons: {
    display: 'flex', 
    margin: 1
  },
  button: {
    padding: .3,
    margin: .1,
    minHeight: 0,
    minWidth: 0,
  },
 date: {
  color: 'grey',
  display: 'flex',
  marginLeft: '1.2em'
 },
 editMode: {
  width: '26.5em',
  display: 'flex',
  flexDirection: 'column',
 },
 datePicker: {
  width: '60%',
  margin: 1,
  alignSelf: 'end'
 },
 displayMode: {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center'
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
    const [date, setDate] = useState<Dayjs | null>(dayjs(todo.dateFor))

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
      <Box sx={todoItemStyles.box} my={1}>
            {editMode ? 
           <Box sx={todoItemStyles.editMode} m={1}> 
            <TextField 
                variant='standard'
                type="text" 
                id={`${todo.id}`}
                value={inputValue}
                onChange={handleInputChange}
                required
                fullWidth
                sx={todoItemStyles.textFieldEdit}
                
              /> 
              <DatePicker 
              sx={todoItemStyles.datePicker} 
              slotProps={{ textField: { size: 'small' }}}
              label="due date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              />
            </Box> :
            
            <Box sx={todoItemStyles.displayMode} > 
            <Checkbox checked={todo.completed} onClick={handleCheck} /> 
              <Typography sx={todoItemStyles.textfield}> {inputValue} </Typography>
              <Box sx={todoItemStyles.date}> 
                <CalendarMonthIcon fontSize='small'> </CalendarMonthIcon>
                <Typography> {date?.format('MM/DD/YYYY')} </Typography>
              </Box>
            </Box>
            } 
            <Box sx={todoItemStyles.buttons} >
            {!editMode ? 
              <Button sx={todoItemStyles.button} variant="outlined" size="small" onClick={()=> toggleEditOn()}> 
                  <ModeIcon fontSize="small" /> 
              </Button> :
              <Button sx={todoItemStyles.button} variant="outlined" size="small" onClick={handleToggleOff}> 
                  <CheckIcon fontSize="small"  />
              </Button>
              } 
              <Button sx={todoItemStyles.button} variant="outlined" size="small" onClick={handleDeleteTask}> 
              <ClearIcon fontSize="small"/> 
              </Button> 
            </Box>
      </Box>
    )
  }
  
  export default ToDoItem;
  