import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import './App.css';

function App() {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')));

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList])

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList}/>
    </div>
  )
}

export default App;
