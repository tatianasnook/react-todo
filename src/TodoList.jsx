import TodoListItem from "./TodoListItem";

const todoList = [
  {id: 1, title: 'Read material for the lesson'},
  {id: 2, title: 'Do textbook exercises'},
  {id: 3, title: 'Complete the assignment'}
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo}/>
      ))}
    </ul>
  )
};

export default TodoList;
