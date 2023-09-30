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
    // width: '30em',
    height: '20em',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    border: '1px solid green',
    flexShrink: '1'
  },
  command_container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  command_options: {
      border: '1px solid black',
      borderRadius: '10px',
      padding: '.5em 1em',
      margin: '.5em'
  },
  microphone_button: {
    backgroundColor: 'white',
    borderRadius: '50%',
    border: '1px solid gray', 
    // padding: '1.3em',
    // margin: '1em'
  }
}

interface Props {
  addTodo: (value: string) => void
  mode: string,
  startStopTimer: () => void
  resetTime: (newMode: string) => void
  handleButtonToggle: (e: React.MouseEvent<HTMLElement>|null,  newValue:string) => void
}

const VirtualAssistant: React.FC<Props> = ({addTodo, startStopTimer,resetTime, handleButtonToggle}) => {

  const command_list = [ 
    "add task: ____________",
    "start pomodoro timer / start long break timer",
    "stop timer"] 

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
      command: ["start pomodoro timer",],
      callback: () => startStopTimer()
    },
    {
      command: ["stop timer"],
      callback: () => startStopTimer()
    },
    {
      command: ["start long break timer"],
      callback: () => {
        console.log('start long break')
        handleButtonToggle(null, 'long')
        startStopTimer()
      }
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
    <Box sx={virtualStyles.chatbox} m={1} p={1}>
      <Typography variant='h4' p={1}> Virtual Assistant </Typography>
      <Typography > Hey there, what can I do for you today? </Typography>
      <Typography> Here are some suggestions</Typography> 
      <Box sx={virtualStyles.command_container}> 
          {command_list.map((command)=> (
            <Box sx={virtualStyles.command_options}> 
              <Typography textAlign='center'> {command} </Typography>
             </Box>
          ))}
          <Button sx={virtualStyles.microphone_button} onClick={handleMic}> 
        {listening ? <MicIcon/> : <MicOffIcon/>} 
          </Button>
      </Box>
      
      {transcript}
    </Box>
  )
}

export default VirtualAssistant;
