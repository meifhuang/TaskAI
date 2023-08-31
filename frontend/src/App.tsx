import React, {useState} from 'react';
import './styles/App.css'; 
import InputField from "./components/InputField"
import VirtualAssistant from "./components/VirtualAssistant"


const App: React.FC = () => {
  
  return (
    <div className="App">
      <h1 className="heading"> TaskAI </h1>
      <VirtualAssistant/>
    </div>
  );
}

export default App;
