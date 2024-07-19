import { useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";
import TodoList from "./TodoList.jsx";
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);

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
