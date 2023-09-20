import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; 


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
    <form onSubmit={handleSubmit}>
        <h1> Login </h1>
        <label htmlFor="username" > Username  </label>
        <input 
            type="text" 
            name="username"
            id="username"
            value={values.username}
            onChange={handleInputChange}
            required/>
        <label htmlFor="firstname" > Password </label>
        <input 
            type="password" 
            name="password"
            id="password" 
            value={values.password}
            onChange={handleInputChange}
            required/>
        <Button variant="contained" type="submit"> Submit </Button>
    </form>
  )
}

export default Login;
