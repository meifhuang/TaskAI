type ToDoItemProps = {
    id: string
    title: string
    complete: Boolean
}

export function ToDoItem({id, title, complete} : ToDoItemProps) {
    return  <li>
    <input type="checkbox" id={id} className="cursor-pointer peer p-3"  />
    <label htmlFor="{id}" className="peer-checked:line-through p-3 peer-checked:text-slate-300">{title} </label>
    </li>
}