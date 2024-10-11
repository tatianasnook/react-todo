
import { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
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
    
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID}/${
      import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

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

      const sortedTodo = todos.sort((objectA, objectB) => {
        const titleA = objectA.title;
        const titleB = objectB.title;
        if (titleA < titleB) {
          return 1;
        } else if (titleA > titleB) {
          return -1;
        } else {
          return 0;
        }
      });

      setTodoList(sortedTodo);
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

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }

      setTodoList(todoList.filter(todo => todo.id !== id));

    } catch (error) {
      console.log(error.message);
    }
  };

  const addTodo = (todoTitle) => {
    postTodo(todoTitle);
  };
  
  const removeTodo = (id) => {
    deleteTodo(id); 
  };

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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
