import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';



// import ToDoItem from "./ToDoItem"
// import {Todo} from "../model"
// import AddIcon from '@mui/icons-material/Add';


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
    <Container maxWidth='md' sx={{height: '100vh', display:'flex', justifyContent:'center', alignItems: 'center'}}>  
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx= {{ height: '20em', width: '29em' , border: '1px solid black', display:'flex', flexDirection:'column',justifyContent:'center', alignItems: 'center'}}
      px={10}
      py={5}
     
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
            <Typography align='center' color='primary' m={2}> Don't have an account? <Link href='/register'> Sign up here </Link> </Typography> 
           
        </Box>
        <Button variant="contained" type="submit" color="success"> Submit </Button>
    </Box>

    </Container>
  )
}

export default Login;
