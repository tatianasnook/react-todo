import * as style from './TodoListItem.module.css';
import check from '../assets/check.png';
import PropTypes from 'prop-types';


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

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func,
}

export default TodoListItem;
