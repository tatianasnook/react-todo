import { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (e) => {
    const newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    console.log(todoTitle);
    setTodoTitle('');
    onAddTodo({title: todoTitle, id: Date.now()});
  } 

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange} />
      <button type="submit"className='add-btn'>Add</button>
    </form>
  )
}

export default AddTodoForm;
