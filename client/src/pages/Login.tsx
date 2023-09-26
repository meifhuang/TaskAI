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


const loginStyles = { 
    box: {
        height: '80%',
        width: '80%',
        display: 'flex', 
        justifyContent:'center', 
        alignItems: 'center',
        boxShadow: '0px 0px 25px 10px rgba(20, 0, 0, 0.1)',
        '@media (max-width: 860px)': {
            boxShadow: 'none',
            height: '100vh',
            width: '100vw'
        }

    },
    imageBox: {
        width: '100%',
        height: '100%',
        '@media (max-width: 860px)': {
            width: '0%',
            height: '70%'
        }
    },
    loginBox: {
        width: '80%', 
        height: '100%',
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems: 'center',
        backgroundColor: 'white',
        '@media (max-width: 860px)': {
            width: '90%',
            height: '80%',
            boxShadow: 'none',
        }
    },
    button: {
        '&:hover': {
         backgroundColor: '#6db3a4'
        },
         backgroundColor: '#84bfb2',
    },
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
            px={8}
            >
            <Typography variant='h3' m={1}> Login </Typography>
            <Typography m={1}> Log in to view dashboard </Typography>

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
            sx={{py:1}}
            />
            <Box sx={{display: 'flex'}}> 
            <Typography align='center' m={2}> Don't have an account? 
            <Link href='/register'> Sign up here </Link> </Typography> 
            </Box>
            <Button variant="contained" type="submit" sx={loginStyles.button}> Login </Button>
            </Box>
        </Box>
  )
}

export default Login;
