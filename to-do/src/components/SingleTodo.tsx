import React from 'react';
import {Todo} from "../model"; 
import '../styles.css'; 

interface Props {
   todo: Todo,
   todos: Todo[], 
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>> 
}

const SingleToDo: React.FC<Props> = ({todo, todos, setTodos}) => {

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => 
            todo.id === id ? {...todo, isDone: todo.isDone} : todo ))
    }
    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => 
            todo.id !== id
            ))
        }
    
      return (
      <form className="todo_item"> 
        <div className="todo_text"> 
            {!todo.isDone ? 
              <span> {todo.todo} </span> :
              <span> completed </span>
            }
            <button className='todo_action'>Edit</button>
            <button className='todo_action' onClick={()=>handleDelete}>Delete</button>
            <button className='todo_action' onClick={()=>handleDone(todo.id)} >Mark Done</button>
        </div>
      </form>
      )
}

export default SingleToDo;

