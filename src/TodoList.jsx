
const todoList = [
  {id: 1, title: 'Read material for the lesson'},
  {id: 2, title: 'Do textbook exercises'},
  {id: 3, title: 'Complete the assignment'}
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map((item) => {
        return(
          <li key={item.id}>
            {item.title}
          </li>
        )
      })}
    </ul>
  )
};

export default TodoList;