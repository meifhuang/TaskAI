import React, {useState} from 'react';
import {Todo} from "../model"; 
import '../styles.css'; 

interface Props {
   todo: Todo,
   todos: Todo[], 
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>> 
}

const SingleToDo: React.FC<Props> = ({todo, todos, setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false); 
    const [editTodo, setEditTodo] = useState<string>(todo.todo); 

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => 
            todo.id === id ? {...todo, isDone: !todo.isDone} : todo ))
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => 
            todo.id !== id
            ))
        }

    const handleEdit = (e:React.FormEvent, id: number) => {
      e.preventDefault();
      setTodos(todos.map((todo) => (
        todo.id === id ? {...todo, todo: editTodo} : todo
      )))
      setEdit(false)
    }
    
      return (
      <form className="todo_item" onSubmit={(e)=>handleEdit(e,todo.id)}> 
        <div className="todo_text"> 
            {edit ? (<input value={editTodo} onChange={(e)=> setEditTodo(e.target.value)} />) : todo.isDone ? 
              (<s> {todo.todo} </s>) :
              (<span> {todo.todo} </span>)
            }
            <button type='button' className='todo_action' onClick={()=> {
              if (!edit && !todo.isDone) {
              setEdit(!edit)
            }}} > Edit </button>
            <button type='button' className='todo_action' onClick={()=>handleDelete(todo.id)}>Delete</button>
            <button type='button' className='todo_action' onClick={()=>handleDone(todo.id)}>Mark</button>
        </div>
      </form>
      )
}

export default SingleToDo;

