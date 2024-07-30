import { useEffect, useRef } from "react";

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id="todoTitle" 
        name="title" 
        value={todoTitle}
        onChange={handleTitleChange} 
      />
    </>
  )
}

export default InputWithLabel;
