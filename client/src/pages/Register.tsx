import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button'; 
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Background from '../assets/background.jpg'; 
import Image from '../assets/register.jpg';
import Link from '@mui/material/Link';


const registerStyles = {
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
    registerBox: {
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

const Register: React.FC = () => {

    const navigate = useNavigate(); 

    const initialValues = {
        fullname:'',
        email:'',
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
                url: 'http://localhost:3000/register',
                data: {
                    fullname: values.fullname,
                    email: values.email,
                    username: values.username, 
                    password: values.password
                }
            });
            if (response) {
                console.log('successfully registered')
                console.log(response)
                navigate('/login')
            }
            else {
                console.log('failed')
            }
        }
        catch (err) {
            console.error('Error during registration', err)
        }
    }

  return (
    <Container sx={registerStyles.container} maxWidth="xl"> 
        <Box sx={registerStyles.box}>
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={registerStyles.registerBox}
            px={8}
        >
        <Typography variant='h3' m={1}> Register </Typography>
        <TextField
            variant="outlined"
            type="text" 
            name="fullname"
            id="fullname"
            value={values.fullname}
            onChange={handleInputChange}
            required
            label="first name"
            fullWidth
            sx={{py:1}}
        />
        <TextField
            variant="outlined"
            type="text" 
            name="email"
            id="email"
            label="email"
            value={values.email}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{py:1}}
            />
        <TextField 
            variant="outlined"
            type="text" 
            name="username"
            id="username"
            label="username"
            value={values.username}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{py:1}}
            />
        <TextField 
            variant="outlined"
            type="password" 
            name="password"
            id="password" 
            label="password"
            value={values.password}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{py:1}}
            />
        <Box sx={{display: 'flex'}}> 
            <Typography align='center' m={2}> Already have an account? 
            <Link href='/login'> Login here </Link> </Typography> 
            </Box>
        <Button variant="contained" type="submit" sx={registerStyles.button} > Sign up </Button>
        </Box>
        <Box sx={registerStyles.imageBox}> 
            <img src={Image} width='100%' height='100%'/> 
        </Box>
        </Box>
    </Container>

  )
}

export default Register;
