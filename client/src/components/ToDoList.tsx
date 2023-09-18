import { useState } from 'react'
import ToDoItem from "./ToDoItem"
import {Todo} from "../model"
import AddIcon from '@mui/icons-material/Add';


const ToDoList: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]); 

//   const handleAdd = (e: React.FormEvent) => {
//     e.preventDefault()
//     setTodos((prev) => [...prev, {id: Date.now(), todo: todo, isDone: false, showInput: true}])
// }


  return (
    <div className="todo_list">
        <h1> ToDo </h1>
        <div className="add_task" onClick={(e)=> handleAdd(e)}>
          <AddIcon className="add_icon"/> Add Task
        </div>
        {todos.map((todo) => (
            <ToDoItem todo={todo} key={todo.id}/>
        ))}
    </div>
  )
}

export default ToDoList;
