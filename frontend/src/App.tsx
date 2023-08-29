import React, {useState} from 'react';
import './App.css';
import './styles.css'; 
import InputField from "./components/InputField"
import ToDoList from "./components/ToDoList"
import VirtualAssistant from "./components/VirtualAssistant"
import {Todo} from "./model"; 



const App: React.FC = () => {
  const [todo, setTodo] = useState<string> ("");
  const [todos, setTodos] = useState<Todo[]>([]); 


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}])
      setTodo("")
    }
  };
  
  return (
    <div className="App">
      <h1 className="heading"> TaskAI </h1>
      {/* <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/> */}
      <ToDoList todos={todos} setTodos={setTodos}/>
      <VirtualAssistant/>
    </div>
  );
}

export default App;