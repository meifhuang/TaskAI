import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ToDoList from "./ToDoList"
import {Todo} from "../model"; 


const VirtualAssistant: React.FC= () => {

  const commands = [
    {
      command: 'reset',
      callback: () => {
        resetTranscript()
        setMessage('you may restate your command')
      } 
    },
    {
      command: ['hello', 'hi', 'hey'],
      callback: () => setMessage('hello there')
    },
    {
      command: 'stop listening',
      callback: () => handleStopListening()
    },
    {
      command: '*weather*',
      callback: () => {
           setMessage('the weather outside is frightful')
        }, 
    },
    {
      command: ['add * to my list', 'add * to the list'], 
      callback: (command:string) => {
        console.log(command)
        setTodo(command)
        setTodos((prev) => [...prev, {id: Date.now(), todo: command, isDone: false}])
        setTodo("")
        resetTranscript()
        setTimeout(()=>setMessage('added'),1000)
      }
    },
    { 
      command: ['completed *', '* done', 'Mark * as done', 'mark * as done'],
      callback: (item:string) => {
        
        setTodos(todos.map((todo) => 
        todo.todo.includes(item) ? {...todo, isDone: !todo.isDone} : todo))
      } 
    },
    {
      command: ['edit * to *'],
      callback: (item1:string, item2:string) => {
      setTodos(todos.map((todo) =>  
      todo.todo.includes(item1) ? {...todo, todo: item2} : todo))
    }},

    {
      command: ['delete * from my list', 'remove * from my list'],
      callback: (item:string) => {
        setTodos(todos.filter((todo) =>
        !todo.todo.includes(item)))
        setMessage('removed')
    }
  },
  ]

  const [message, setMessage] = useState<string>(""); 
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); 

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // const handleAdd = (task:string) => {
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

  const handleStartListening = () => {
    console.log('listening')
    SpeechRecognition.startListening({continuous:true});
  };

  const handleStopListening = () => {
    console.log('stop')
    SpeechRecognition.stopListening();
    resetTranscript()
  }

  return (
    <div> 
      <ToDoList todos={todos} setTodos={setTodos}/>
      <p> Microphone: {listening ? 'on' : 'off' } </p>
      <button onClick={handleStartListening}>Start</button>
      <button onClick={handleStopListening}>Stop</button>
      {/* <button onClick={resetTranscript}>Reset</button> */}
      <p> {transcript} </p>
      <p>{message}</p>
    </div>
  )
  }
    // return <form className='input'>
    //     <input type='input' 
    //     placeholder='Enter instructions' 
    //     className='input_box'
    //     value={message} 
    //     onChange={(e)=> setMessage(e.target.value)}/>  
    //     <button className='input_submit' type='submit' > Enter instructions </button>
    // </form> 
    
export default VirtualAssistant;

