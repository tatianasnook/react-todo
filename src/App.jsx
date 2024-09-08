
import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData(){
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`}
    };
    
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);
      
      if(!response.ok){
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title
        }
        return newTodo;
      });
      
      setTodoList(todos);
      setIsLoading(false);

    } catch(error){
      console.log(error.message);
    }
  }
  
  const postTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
          title: todo.title,
        },
      };

    const response = await fetch(
      `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`, // Ensure this matches your GET request
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
      }
    );
  
    if (!response.ok) {
      const message = `Error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const dataResponse = await response.json();

    const newTodo = {
      id: dataResponse.id,
      title: dataResponse.fields.title,
    };

    setTodoList([...todoList, newTodo]);

  } catch (error) {
    console.log(error.message);
  }
};

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (todoTitle) => {
    postTodo(todoTitle);
  };
  

  const removeTodo = (id) => {
    const newToDoList = todoList.filter(
      (todo) => todo.id !== id)
    setTodoList(newToDoList)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="container">
                <h1>Todo List</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ? <p>Loading ...</p> : 
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
              </div>
            }
          />
          <Route 
            path="/new" 
            element={
              <div className="container">
                <h1>New Todo List</h1>
              </div>
            }  
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
