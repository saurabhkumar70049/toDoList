import React, {useState, useEffect} from "react";

import axios from "axios";


const DisplayToDo = () => {
  let [todos, setTodos] = useState("")
  let [status, setStatus] = useState("")


  useEffect(()=>{
         handleChange()
  },[status])

  function handleChange(event) {
    axios.get("http://localhost:8000/api/todo")
    .then(response=> setTodos(response.data.data))
    .catch(error=> console.log(error))
  }

  function updateStatus(id) {
     console.log("status is updating...")
    axios.patch(`http://localhost:8000/api/todo/${id}`, {
        status: status
    })
    .then(response=> console.log(response))
    .catch(error=> console.log(error))
  }

  function deleteTodo(id) {
    console.log("deleting...")
    axios.delete(`http://localhost:8000/api/todo/${id}`)
    .then(response=> {
        console.log(response)
        handleChange()
    })
    .catch(error=> console.log(error))




  }


    return(
        <div> 
            {
                todos && (
                todos.map((todo)=>(
                      <div key={todo._id}> 
                          <h2>{todo.title}</h2> 
                          <select name="status" id="status">
                                <option value="todo" disabled selected>To Do</option>
                                <option value="true">Completed</option>
                                <option value="false">Not Completed</option>
                          </select>
                         <button onClick={()=>updateStatus(todo._id)}>Update</button>
                         <button onClick={()=>deleteTodo(todo._id)}>Delete</button>
                      </div>
                ))
                )
            }

        </div>
    )
}

export default DisplayToDo