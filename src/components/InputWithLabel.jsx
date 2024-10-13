import { useEffect, useRef } from "react";
import * as style from './InputWithLabel.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

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

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
  children: PropTypes.string,
}

export default InputWithLabel;
