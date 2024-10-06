import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';


const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    onAddTodo({title: todoTitle, id: Date.now()});
    setTodoTitle('');
  } 

  return (
    <form onSubmit={handleAddTodo} className='form'>
      <InputWithLabel 
        todoTitle={todoTitle} 
        handleTitleChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      <button type="submit"className='add-btn'>Add</button>
    </form>
  )
}

AddTodoForm.propTypes ={
  onAddTodo: PropTypes.func,
}

export default AddTodoForm;
