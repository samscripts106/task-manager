import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { v4 as uuidv4 } from 'uuid'
import Navbar from './components/Navbar'
// import './App.css'

function App() {
  const [todo, setTodo] = useState("") //Current todo in the input
  const [todos, setTodos] = useState([]) //Array containing all todos 
  const [showFinished, setshowFinished] = useState(true)

  const toggleFinished = (e) => {
    setshowFinished (!showFinished)
  }
  
  //Load the todos on first mount
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){ //provided todoString isnt empty
      let todos = JSON.parse(localStorage.getItem("todos")) //String to JSON
      setTodos(todos)
    }
  }, [])
  
  //takes the todos array as parameter and stores in JSON as string
  const saveToLS = (todos) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) =>{
    //Find the todo we want to edit
    let t = todos.filter(i=>i.id === id)
    //Put its text back into the input
    setTodo(t[0].todo)
    //Remove the old todo
    let newTodos = todos.filter(item=>{
        return item.id!==id
    })

    //Update the array
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (id) =>{
    //Keep every todo except the selected one
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })

    //Update the array
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () =>{
    let newTodos = [...todos, {id:uuidv4(), todo, isCompleted: false}]
    //Add a new todo to the array
    setTodos(newTodos)
    //Clear input
    setTodo("")
    saveToLS(newTodos)
  }

  const handleChange = (e) =>{
    //Update todo with the input text
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    //Get the clicked todo's ID
    let id = e.target.name;
    //get the index of the todo i checked
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    //copy the array
    let newTodos = [...todos]
    //Toggle the completed status 
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    //Update the array
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  

  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-3">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='bg-white w-1/2'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6">Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0  && <div className='m-5'>No Todos to display</div>}

          {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 justify-between my-3">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
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
