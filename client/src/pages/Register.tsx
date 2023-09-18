import { useState } from 'react'
import axios from "axios";
// import ToDoItem from "./ToDoItem"
// import {Todo} from "../model"
// import AddIcon from '@mui/icons-material/Add';


const Register: React.FC = () => {

    const initialValues = {
        firstname:'',
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
                    firstname: values.firstname,
                    email: values.email,
                    username: values.username, 
                    password: values.password
                }
            });
            if (response) {
                console.log('successfully registered')
                console.log(response)
            }
        }
        catch (err) {
            console.error('Error during registration', err)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <h1> Register </h1>
        <h2> Please fill in all fields  </h2>
        <label htmlFor="firstname"> Name </label>
        <input 
            type="text" 
            name="firstname"
            id="firstname"
            value={values.firstname}
            onChange={handleInputChange}
            required/>
        <label htmlFor="email"> Email </label>
        <input 
            type="text" 
            name="email"
            id="email"
            value={values.email}
            onChange={handleInputChange}
            required/>
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
        <button type="submit"> Submit </button>
    </form>
  )
}

export default Register;
