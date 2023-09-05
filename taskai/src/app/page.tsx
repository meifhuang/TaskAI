import Link from "next/link"
import {ToDoItem} from "./components/ToDoItem"
import {prisma} from '@/db'
import {redirect} from "next/navigation"

async function createTodo(data: FormData) {
  "use server"
  const title = data.get("title")?.valueOf()
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title")
  }
  await prisma.todo.create({data: {title: title, complete: false}})
  redirect("/")
}

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
      <ToDoItem title={todo.title} id={todo.id} complete={todo.complete} />
    ))}

    </ul>
    <form action={createTodo} className="flex gap-2 flex-col">
      <input
        type="text"
        name="title"
        className="border border-slate-500"
        />
      <button 
        type="submit"
        className="border"
      > 
        Submit
      </button>
    </form>
    {/* <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/> */}
  
  </>
    )

}