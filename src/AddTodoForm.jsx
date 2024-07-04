const AddTodoForm = (props) => {

  const handleAddTodo = (e) => {
    e.preventDefault();
    let todoTitle = e.target.title.value;
    console.log(todoTitle);
    e.target.reset();
    props.onAddTodo(todoTitle);
  } 

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input id="todoTitle" name="title" />
      <button type="submit">Add</button>
    </form>
  )
}

export default AddTodoForm;
