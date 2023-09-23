import { useState } from 'react'
import ToDoItem from "./ToDoItem"
import {Todo} from "../model"
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';


const todolistStyles = {
  todo_list: {
    display: 'flex', 
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '6px',
    height: '38em', 
    width: '36em',
    boxShadow: '0px 0px 47px -17px rgb(156, 168, 178)'
  },
  add_task: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    border: '1px solid black',
    borderRadius: '5px',
    width: '100%',
   
  }
}

const fakeTodos = [
  'Buy groceries',
  'Finish report',
  'Walk the dog',
  // ... more fake todos
];

const ToDoList: React.FC = () => {

  const [todos, setTodos] = useState<String[]>(fakeTodos); 
  

//   const handleAdd = (e: React.FormEvent) => {
//     e.preventDefault()
//     setTodos((prev) => [...prev, {id: Date.now(), todo: todo, isDone: false, showInput: true}])
// }

  return (
    <Box sx={todolistStyles.todo_list} p={5} m={2}>
        <Typography variant='h3' m={1}> Today's Priority Task </Typography>
        <Typography variant='h6' m={1}> Enter three of the most important tasks for the day </Typography>
        <Box sx={todolistStyles.add_task} p={1} >
          <AddIcon className="add_icon"/> Add Task
        </Box>
        {todos.map(() => (
            <ToDoItem/>
        ))}
      <TextField
            variant="outlined"
            type="text" 
            name="todo"
            id="todo" 
            value={todo}
            // onChange={handleInputChange}
            required
            label="enter todo"
            fullWidth
            sx={{py:1}}
          />
    </Box>
  )
}

export default ToDoList;
