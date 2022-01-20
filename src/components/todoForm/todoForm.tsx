import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import './todoForm.css';
interface TodoFormProps {
  currentEditTodo: any, 
  setKeyword: any, 
  handleSubmit: any,
}

function TodoForm({currentEditTodo, setKeyword, handleSubmit}: TodoFormProps) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (currentEditTodo == null) {
      setValue("");
    }else {
      setValue(currentEditTodo.title)
    }
  }, [currentEditTodo]);

  return (
    <form onSubmit={(e) => handleSubmit(e, value, setValue)} className="todo-form-container">
      <input
        value={value}
        onChange={(e) => {setValue(e.target.value); setKeyword(e.target.value);}}
      />
      <button type="submit">{(currentEditTodo == null)? 'Add':'Edit'}</button>
    </form>
  );
}

TodoForm.propTypes = {
  todo: PropTypes.object,
  setCurrentEditTodo: PropTypes.any,
  currentEditTodo: PropTypes.any
};
export default TodoForm;