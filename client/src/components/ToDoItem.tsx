import { useState } from 'react'
// import {Todo} from "../model"

interface Props {
  todo: { 
    id: number;
    todo: string;
    isDone: boolean;
    showInput: boolean;
  }
}

const ToDoItem: React.FC<Props> = ({todo}) => {

    return (
      <>
      <h1> {todo.todo} </h1>
      </>
    )
  }
  
  export default ToDoItem;
  