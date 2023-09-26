import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Box from '@mui/material/Box';

const virtualStyles = {
  chatbox: {
    width: '30em',
    height: '37em',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '6px'
  },
  command_box: {
    border: '1px solid black'
  }
}

const VirtualAssistant: React.FC = () => {

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
      <h1> Virtual Assistant </h1>
      <h3> Hey there, what can I do for you today? </h3>
      <p> Here are some suggestions</p> 
      <Box sx={virtualStyles.command_box}> 
          hello
      </Box>
    </Box>
  )
}

export default VirtualAssistant;
