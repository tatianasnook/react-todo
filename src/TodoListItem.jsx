const TodoListItem = (props) => {
  return (
    <li key={props.todo.key}>
        {props.todo.title}
    </li>
  )
}

export default TodoListItem;