
import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(
        () => resolve({data: {todoList: JSON.parse(localStorage.getItem('savedTodoList'))}}), 
        2000
      );
    })
    .then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    })
  }, [])

  useEffect(() => {
    if(!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id) => {
    const newToDoList = todoList.filter(
      (todo) => todo.id !== id)
    setTodoList(newToDoList)
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading ...</p> : 
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </div>
  )
}

export default App;
