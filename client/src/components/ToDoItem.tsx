import { useState } from 'react'
import {Todo} from "../model"

interface Props {
    todo: Todo,
}

const ToDoItem: React.FC<Props> = ({todo}) => {

    return (
      <>
      <h1> {todo.todo} </h1>
      </>
    )
  }
  
  export default ToDoItem;
  