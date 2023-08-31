import React, {useState} from 'react';
import {Todo} from "../model"; 
import SingleTodo from "../components/SingleTodo"
import InputField from './InputField';
import "../styles/ToDoList.css"
import AddIcon from '@mui/icons-material/Add';


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToDoList: React.FC<Props> = ({todos, setTodos}) => {

  const [todo, setTodo] = useState<string>("");

  // const [showInputField, setShowInputField] = useState<boolean>(false); 

   const handleAdd = (e: React.FormEvent) => {
      e.preventDefault()
      setTodos((prev) => [...prev, {id: Date.now(), todo: todo, isDone: false, showInput: true}])
      }

  // const handleShowInputField = () => {
  //     setTodos((prev) => [...prev, {id: Date.now(), todo: "", isDone: false, showInput: true}])
  // }

    const date = new Date();
    const dow = date.toLocaleString('default', {weekday: 'long'})
    const month = date.toLocaleString('default', {month: 'short'})
    const day = date.getDate()
    const year = date.getFullYear()


    return (
    <div className="todo_list"> 
      <div className='date_display'>
        <h3> {dow}, {month} {day} </h3>
      </div>
      <div className="add_task" onClick={(e)=> handleAdd(e)}>
          <AddIcon className="add_icon"/> Add Task
      </div>


    { todos.map((todo) => (
       <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
    ))}
    
    {/* <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/> */}

  </div>
    )
}

export default ToDoList;

