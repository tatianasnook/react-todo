import { useEffect, useRef } from "react";
import * as style from './InputWithLabel.module.css';

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <>
      <label htmlFor="todoTitle" className={style.label}>{children}</label>
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
