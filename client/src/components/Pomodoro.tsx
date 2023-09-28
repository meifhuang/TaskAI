import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import { Typography } from '@mui/material';
import music from "../assets/todo.mp3";


const pomodoroStyles = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: '30em',
        height: '20em',
        boxShadow: '0px 0px 30px 8px rgb(156, 168, 178)',
        backgroundColor: 'white', 
    },
    options: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    start: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const Pomodoro: React.FC = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(1 * 5);
    const [mode, setMode] = useState('pomo')
   

    useEffect(() => {
        let intervalId: number; 

        if (isRunning && seconds > 0) {
            intervalId = setInterval(()=> {
                setSeconds(seconds - 1)
            }, 1000)
        }
        else if (seconds === 0) {
              setIsRunning(prev => !prev)
              playAlarm()
              resetTime()
        }
        return () => {
              clearInterval(intervalId);
          }
    },[seconds,isRunning])

    const playAlarm = () => {
        console.log("ALARM")
        const audio = new Audio(music);
        audio.loop = true;
        audio.play();
      };

    const startStopTimer = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    const setPomo = () => {
        setMode("pomo")
        setSeconds(25 * 60)
    }
    const setShort = () => {
        setMode("short")
        setSeconds(5 * 60)
    }
    const setLong = () => {
        setMode("long")
        setSeconds(10*60)
    }
    
    const resetTime = () => {
        if (mode === 'pomo') {
            setSeconds(2*60)
          }
        else if (mode === 'long') {
        setSeconds(10*60) 
        }   
        else if (mode === 'short') {
        setSeconds(5*60)
        }
    }
   
    return (
        <Box sx={pomodoroStyles.box} m={2} p={2}>
            <Box sx={pomodoroStyles.options}> 
                <Button variant={`${mode==='pomo'?'contained':'outlined'}`} onClick={setPomo}> <Typography> pomodoro </Typography> </Button>
                <Button variant={`${mode==='long'?'contained':'outlined'}`}  onClick={setLong}> <Typography> long break </Typography> </Button>
                <Button variant={`${mode==='short'?'contained':'outlined'}`}  onClick={setShort}> <Typography> short break </Typography> </Button>
            </Box>
            <Typography variant="h1" textAlign='center'>{Math.floor(seconds/60) === 0 ? '00':Math.floor(seconds/60)}:{`${seconds%60 === 0 ? '00': (seconds%60 < 10 ? `0${seconds%60}`: seconds%60) }`} </Typography>
            <Box sx={pomodoroStyles.start}> 
            {isRunning ? 
            <Button onClick={startStopTimer} variant="outlined"> Stop </Button> : 
            <Button onClick={startStopTimer} variant="outlined"> Start </Button> }
            <Button onClick={resetTime} variant="outlined"> Reset </Button>
        </Box>
        </Box>
    )
}

export default Pomodoro;