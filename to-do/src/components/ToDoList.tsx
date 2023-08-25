import React from 'react';
import {Todo} from "../model"; 


interface Props {
    todos: Todo[]
}

const ToDoList: React.FC<Props> = ({todos}) => {
    return  <div className="todo_list"> 
    { todos && todos.map(todo => {
      return (<div className="todo_card"> {todo.todo} </div>)
    }) }
  </div>
}
export default ToDoList;

