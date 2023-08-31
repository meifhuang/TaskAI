import React, {useState} from 'react';
import {Todo} from "../model"; 
import '../styles/SingleToDo.css'; 
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

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
        todo.id === id ? {...todo, todo: editTodo, showInput: false} : todo
      )))
      setEdit(false)
    }
    
      return (
      <form className="todo_item" onSubmit={(e)=>handleEdit(e,todo.id)}> 
        <div className="todo_text">  
  
            <div> {todo.isDone ? 
              <> 
              <CheckBoxIcon fontSize="inherit" className="checkbox" onClick={()=>handleDone(todo.id)}/>
              {todo.showInput ? <input className="task_input" value={editTodo} onChange={(e)=> setEditTodo(e.target.value)} /> : <s> {todo.todo} </s>}
              </>
                  :
              <>
              <CheckBoxOutlineBlankIcon fontSize='inherit' className="unchecked" onClick={()=>handleDone(todo.id)}/> 
              {todo.showInput ? <input className="task_input" value={editTodo} onChange={(e)=> setEditTodo(e.target.value)}  /> :<span> {todo.todo} </span>}
              </>
                }
              </div>
        </div> 
      </form>
               
              //   : <> </> } 
             
              // {/* {showInput ? <input className="" placeholder="enter task"/> : <s> {todo.todo} </s> } */}


            //   {/* <div> {todo.isDone ?
            //     <CheckBoxIcon className="checkbox" onClick={()=>handleDone(todo.id)}/> : 
            //     <CheckBoxOutlineBlankIcon fontSize='small' className="unchecked" onClick={()=>handleDone(todo.id)}/>} 
            //     <span>{todo.todo} </span>
            //   </div> */}
            // {/* } */}
            // {/* <button type='button' className='todo_action' onClick={()=> {
            //   if (!edit && !todo.isDone) {
            //   setEdit(!edit)
            // }}} > Edit </button> */}
            // {/* <button type='button' className='todo_action' onClick={()=>handleDelete(todo.id)}>Delete</button> */}
            // {/* <button type='button' className='todo_action' onClick={()=>handleDone(todo.id)}>Mark</button> */}
     
      )
          }

export default SingleToDo;

