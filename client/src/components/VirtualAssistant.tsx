import React, {useState} from 'react';
import 'regenerator-runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


const virtualStyles = {
  chatbox: {
    minWidth: '35em',
    height: '500px',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '1.5em',
    boxShadow: '0px 0px 30px 8px rgb(156, 168, 178)',
  },
  command_container: {
    height: '100%'
  },
  command_options: {
      border: '1px solid black',
      borderRadius: '10px',
      padding: '1em 2em',
      margin: '1em'
  },
  microphone_button: {
    backgroundColor: 'white',
    borderRadius: '50%',
    border: '1px solid gray', 
    padding: '1.3em',
    margin: '1em'
  }
}

interface Props {
  addTodo: (value: string) => void
  openTaskList: () => void
  closeTaskList: () => void
}

const VirtualAssistant: React.FC<Props> = ({addTodo, openTaskList, closeTaskList}) => {

  const command_list = [
    "Open today's task list / Open to do", 
    "Add task: ____________"] 

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
      command: ["open today's task list", "open to do"],
      callback: () => openTaskList()
    },
    {
      command: ["close today's task list", "close to do"],
      callback: () => closeTaskList()
    },
    {
      command: ['add task *'], 
      callback: (command:string) => {
        console.log('hello')
        console.log(command)
        addTodo(command)
        // setTodos((prev) => [...prev, {id: Date.now(), todo: command, isDone: false, showInput: false}])
        resetTranscript()
        setTimeout(()=>setMessage('added'),1000)
      }
    },
  ]

  const [message, setMessage] = useState<string>(""); 

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleMic = () => {
    if (listening) {
      handleStopListening()
     } 
    else { handleStartListening() } 
  }

  const handleStartListening = () => {
    console.log('listening')
    SpeechRecognition.startListening({continuous:true});
  };

  const handleStopListening = () => {
    console.log('stop mic')
    SpeechRecognition.stopListening();
    resetTranscript()
  }

  return (
    <Box sx={virtualStyles.chatbox} m={1}>
      <Typography variant='h3'> Virtual Assistant </Typography>
      <Typography variant='h6'> Hey there, what can I do for you today? </Typography>
      <Typography> Here are some suggestions</Typography> 
      <Box sx={virtualStyles.command_container}> 
          {command_list.map((command)=> (
            <Box sx={virtualStyles.command_options}> 
              <Typography> {command} </Typography>
             </Box>
          ))}
      </Box>
      <Button sx={virtualStyles.microphone_button} onClick={handleMic}> {listening ? <MicIcon/> : <MicOffIcon/>} </Button>
      {transcript}
    </Box>
  )
}

export default VirtualAssistant;
