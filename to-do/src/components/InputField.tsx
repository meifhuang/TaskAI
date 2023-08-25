import React from 'react';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

    return <form className='input' onSubmit={(e) => {
        handleAdd(e) }} >
        <input type='input' 
        placeholder='Enter a task' 
        className='input_box'
        value={todo} 
        onChange={(e)=> setTodo(e.target.value)}/>  
        <button className='input_submit' type='submit' > Add </button>
    </form> 
}
export default InputField;

