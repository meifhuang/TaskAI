import React, {useState} from 'react';
import './App.css';
import './styles.css'; 
import InputField from "./components/InputField"
import VirtualAssistant from "./components/VirtualAssistant"


const App: React.FC = () => {
  
  return (
    <div className="App">
      <h1 className="heading"> TaskAI </h1>
      {/* <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/> */}
      <VirtualAssistant/>
    </div>
  );
}

export default App;
