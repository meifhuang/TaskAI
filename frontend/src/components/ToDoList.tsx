import React from 'react';
import {Todo} from "../model"; 
import SingleTodo from "../components/SingleTodo"
import "../styles/ToDoList.css"



interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const ToDoList: React.FC<Props> = ({todos, setTodos}) => {

  //   const handleAdd = (task:string) => {
  //     console.log('called')
  //     let extraction = transcript
  //     console.log(extraction)
  //     let add_index = extraction.indexOf('list')
  //     let task = extraction.substring(add_index+4)
  //     console.log(task)
  //     if (task) {
  //       setTodo(task)
  //       setTodos((prev) => [...prev, {id: Date.now(), todo: task, isDone: false}])
  //       console.log(task)
  //       setMessage(`adding ${task}`)
  //     }
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
    { todos.map((todo) => (
       <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
    ))}
  
    <button type='button' onClick={} className="add_task_button"> + </button> 
  </div>
    )
}

export default ToDoList;

