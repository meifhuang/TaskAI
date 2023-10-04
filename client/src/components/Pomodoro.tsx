import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const pomodoroStyles = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '30em',
        height: '15em',
        // boxShadow: '0px 0px 30px 8px rgb(156, 168, 178)',
        backgroundColor: '#81aab1', 
        // border: '1px solid green'
        borderRadius: '3px'
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
    }, 
    toggle: {
        width: '140px',
    }
}

interface Props {
    mode: string,
    isRunning: boolean,
    seconds: number,
    startStopTimer: () => void
    handleButtonToggle: (e: React.MouseEvent<HTMLElement>, newValue: string) => void
    resetTime: (newMode: string) => void
    handleOpen: () => void,
    handleClose: () => void
}

const Pomodoro: React.FC<Props> = ({mode, isRunning, seconds, startStopTimer, handleButtonToggle, resetTime, handleOpen, handleClose}) => {
   
    return (
        <Box sx={pomodoroStyles.box} m={1} p={1}>
            <ToggleButtonGroup exclusive sx={pomodoroStyles.options} value={mode} onChange={handleButtonToggle}> 
                <ToggleButton sx={pomodoroStyles.toggle} value="pomo"> <Typography > pomodoro </Typography> </ToggleButton>
                <ToggleButton sx={pomodoroStyles.toggle} value="long"> <Typography > long break </Typography> </ToggleButton>
                <ToggleButton sx={pomodoroStyles.toggle} value="short"> <Typography > short break </Typography> </ToggleButton>
            </ToggleButtonGroup>
            <Typography variant="h1" textAlign='center'>{Math.floor(seconds/60) === 0 ? '00':Math.floor(seconds/60)}:{`${seconds%60 === 0 ? '00': (seconds%60 < 10 ? `0${seconds%60}`: seconds%60) }`} </Typography>
        <Box sx={pomodoroStyles.start}> 
            {isRunning ? 
            <Button onClick={startStopTimer} variant="outlined"> Stop </Button> : 
            <Button onClick={startStopTimer} variant="outlined"> Start </Button> }
            <Button onClick={()=>resetTime(mode)} variant="outlined"> Reset </Button>
        </Box>
        </Box>
    )
}

export default Pomodoro;