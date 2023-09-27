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
    width: '30em',
    height: '37em',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '1.5em'
  },
  command_container: {
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

const VirtualAssistant: React.FC = () => {

  const command_list = ["Add ______ to my list", "Mark ______ as done", "Edit task ______ to ______", "Remove ______ from my list"] 


  const commands = [
    {
      command: 'reset',
      callback: () => {
        resetTranscript()
        setMessage('you may restate your command')
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
    <Box sx={virtualStyles.chatbox}>
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
