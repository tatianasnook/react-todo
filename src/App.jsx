import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import './App.css';

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);

  useEffect(() => {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }, [todoList]);

  return [todoList, setTodoList]
}
  
function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

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
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </div>
  )
}

export default App;
