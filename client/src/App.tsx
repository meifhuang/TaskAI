// import { useState } from 'react'
import './App.css'
import VirtualAssistant from "./components/VirtualAssistant"
import ToDoList from "./components/ToDoList"

const App: React.FC = () => {

  return (
    <>
    <h1> TaskAI</h1>
    <ToDoList/>
    <VirtualAssistant/>
    </>
  )
}

export default App
