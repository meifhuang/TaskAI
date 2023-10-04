import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';


const habitStyles = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center', 
        justifyContent: 'center',
        // border: '2px solid black',
        borderRadius: '3px',
        backgroundColor: 'white'
    },
    icon: { 
        fontSize: 'large',
        color: 'orange'
    }, 
    habitText: {
        border: '1px solid black'
    },
    text: {
        display: 'flex',
        // justifyContent: 'space-between',
        border: '1px solid black',
        margin: '.5em',
        padding: '.5em',
        borderRadius: '5px'
    }
}


const Habits: React.FC = () => {
    return (
        <Box sx={habitStyles.box} p={3} m={1}>
            <Typography variant='h4'> Habits </Typography>
            {/* <Box sx={habitStyles.habitText} p={1}> */}
            <Typography sx={habitStyles.text}> read 5 pages <WhatshotIcon sx={habitStyles.icon}/> 1 </Typography>
            <Typography sx={habitStyles.text}> do one leetcode <WhatshotIcon sx={habitStyles.icon}/> 7</Typography>
            <Typography sx={habitStyles.text}> duolingo <WhatshotIcon sx={habitStyles.icon}/> 10 </Typography>
            {/* </Box> */}
        </Box>
    )
}

export default Habits;