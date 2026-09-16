import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { v4 as uuidv4 } from 'uuid'
import Navbar from './components/Navbar'
// import './App.css'

function App() {
  const [todo, setTodo] = useState("") //Each todo
  const [todos, setTodos] = useState([]) //Array that holds all the todos

  const handleEdit = () =>{

  }

  const handleDelete = (id) =>{
      let newTodos = todos.filter(item=>{
        return item.id!==id
      })
      setTodos(newTodos)
  }

  const handleAdd = () =>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
  }

  const handleChange = (e) =>{
      setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
  let id = e.target.name;
  
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  let newTodos = [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
  setTodos(newTodos)
  }
  

  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-3">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='bg-white w-1/2'/>
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6">Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">

          {todos.map(item=>{
            return <div key={item.id} className="todo flex w-1/2 justify-between my-3">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              <div className="buttons">
                <button onClick={handleEdit} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
                  Edit
                </button>
                <button onClick={()=>{handleDelete(item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
                  Delete
                </button>
              </div>
            </div>
          })}

          
        </div>
      </div>
    </>
  )
}

export default App
