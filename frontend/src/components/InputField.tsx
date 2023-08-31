import React from 'react';
import "../styles/InputField.css"

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

    return <form className='add_form' onSubmit={(e) => { handleAdd(e) }} >
            {/* <button type='submit' onClick={handleAdd} className="add_task_button"> + </button>  */}
            <input type='input' 
            placeholder='Enter a task' 
            className='add_task_input'
            value={todo} 
            onChange={(e)=> setTodo(e.target.value)}/>  
            {/* <button className='input_submit' type='submit' > Add </button> */}
            </form> 

}
export default InputField;

