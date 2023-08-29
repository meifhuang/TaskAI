import React, {useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const VirtualAssistant: React.FC= () => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening();
  };

  return (
    <div> 
      <p> Microphone: {listening ? 'on' : 'off' } </p>
      <button onClick={handleStartListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
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

