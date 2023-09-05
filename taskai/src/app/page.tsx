import Link from "next/link"
import {prisma} from '@/db'

export default async function Home() {

  
  const date = new Date();
  const dow = date.toLocaleString('default', {weekday: 'long'})
  const month = date.toLocaleString('default', {month: 'short'})
  const day = date.getDate()
  const year = date.getFullYear()

  const todos = await prisma.todo.findMany()
  // await prisma.todo.create({data: {title: "test", complete: false}})

  return (
    <> 
    <header className="flex items-center mb-4"> 
      <h1 className="text-5xl"> TaskAI </h1> 
      
    </header>

    <div className="flex items-center mb-3">
    {/* <div className='flex'> */}
        <h3 className="text-2xl"> {dow}, {month} {day} </h3>
      {/* </div> */}
      {/* <div className="add_task" onClick={(e)=> handleAdd(e)}>
          <AddIcon className="add_icon"/> Add Task
      </div> */}
    </div>
    <ul className="pl-4"> 
    { todos.map(todo => (
      <li key={todo.id}> - {todo.title} </li>
    ))}
    </ul>
    {/* <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/> */}
  
  </>
    )

}