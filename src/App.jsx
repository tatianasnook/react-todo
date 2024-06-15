import * as React from 'react';
// import './App.css';

const todoList = [
  {
    id: 1,
    title: 'Read material for lesson 1.1'
  },
  {
    id: 2,
    title: 'Do textbook exercises'
  },
  {
    id: 3,
    title: 'Complete assignment'
  }
];

function App() {
  
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function(item){
          return(
            <li ley={item.id}>
              {item.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App;
