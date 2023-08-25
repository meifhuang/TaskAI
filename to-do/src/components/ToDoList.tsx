import React from 'react';
import {Todo} from "../model"; 
import SingleTodo from "../components/SingleTodo"
import "../styles.css"


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToDoList: React.FC<Props> = ({todos, setTodos}) => {
    return  <div className="todo_list"> 
    { todos.map((todo) => (
       <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>
    ))}
  </div>
}

export default ToDoList;

