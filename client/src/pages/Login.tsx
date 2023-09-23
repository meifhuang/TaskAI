import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Image from '../assets/login.jpg';
import Background from '../assets/background.jpg'; 


// import ToDoItem from "./ToDoItem"
// import {Todo} from "../model"
// import AddIcon from '@mui/icons-material/Add';

const loginStyles = {
    container: {
        height: '100vh',
        display: 'flex', 
        justifyContent:'center', 
        alignItems: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }, 
    box: {
        height: '80%',
        width: '80%',
        display: 'flex', 
        justifyContent:'center', 
        alignItems: 'center',
        boxShadow: '0px 0px 25px 10px rgba(20, 0, 0, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'

    },
    imageBox: {
        width: '100%',
        height: '100%',
    },
    loginBox: {
        width: '80%', 
        height: '100%',
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    }
}


const Login: React.FC = () => {

    const navigate  = useNavigate(); 

    const initialValues = {
        username:'',
        password:''
    }

    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    username: values.username, 
                    password: values.password
                }
            });
            if (response) {
                console.log('successfully logged in')
                localStorage.setItem('token', response.data.token)
                console.log(response)
                navigate('/dashboard')
            }
            else {
                console.log('Login failed')
            }
        }
        catch (err) {
            console.error('Error during login', err)
        }
    }

  return (
    <Box sx={loginStyles.container} p={0} m={0}>
       <Box sx={loginStyles.box}> 
            <Box sx={loginStyles.imageBox}> 
            <img src={Image} width='100%' height='100%'/> 
            </Box>
            <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx= {loginStyles.loginBox}
            px={10}
            >
            <Typography variant='h3' m={2}> Login </Typography>
            <TextField
            variant="outlined"
            type="text" 
            name="username"
            id="username"
            value={values.username}
            onChange={handleInputChange}
            required
            label="username"
            fullWidth
            sx={{py: 1}}
            />
            <TextField
            variant="outlined"
            type="password" 
            name="password"
            id="password" 
            value={values.password}
            onChange={handleInputChange}
            required
            label="password"
            fullWidth 

            />
            <Box sx={{display: 'flex'}}> 
            <Typography align='center' color='primary' m={2}> Don't have an account? 
            <Link href='/register'> Sign up here </Link> </Typography> 
            </Box>
            <Button variant="contained" type="submit" color="success"> Submit </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default Login;
