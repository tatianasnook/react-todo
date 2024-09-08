import * as style from './TodoListItem.module.css';
import check from './assets/check.png';

const TodoListItem = ({ todo, onRemoveTodo }) => {

  return (
    <li className={style.ListItem}>
      {todo.title}
      <img 
        src={ check } 
        alt="check mark" 
        onClick={() => onRemoveTodo(todo.id)}
      />
    </li>
  )
}

export default TodoListItem;
