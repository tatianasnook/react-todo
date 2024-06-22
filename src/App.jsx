
const todoList = [
  {id: 1, title: 'Read material for the lesson'},
  {id: 2, title: 'Do textbook exercises'},
  {id: 3, title: 'Complete the assignment'}
];

function App() {
  
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function(item){
          return(
            <li key={item.id}>
              {item.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App;
