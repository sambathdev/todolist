import React from "react";
import {todosDb} from "../../firebase";
import PropTypes from 'prop-types';
import Todo from "../../interface/todo";
import "./todo.css";

interface TodoProps {
  todo: Todo,
  setCurrentEditTodo: any,
  currentEditTodo: Todo | null
}

function TodoRow({ todo, setCurrentEditTodo, currentEditTodo }: TodoProps) {
  const handleToggleCheckTodo = () => {
    todosDb.child(todo.id).set({...todo,complete:!todo.complete});
  }
  
  const handleRemoveTodo = () => {
    todosDb.child(todo.id).remove();
  }

  return (
    <div className="todo">
      <div className="left" onClick={handleToggleCheckTodo}>
        <img src={todo.complete? "/check.png":"/circle.png"} alt="" />
        <p className={todo.complete?"complete":""}>{todo.title}</p>
      </div>
      <div className="right">
        <button onClick={handleRemoveTodo} className="remove-button">Remove</button>
        <button onClick={() => setCurrentEditTodo(todo)} className="edit-button">{(currentEditTodo == null)? 'Edit':'Cancel Edit'}</button>
      </div>
    </div>
  );
}

TodoRow.propTypes = {
  todo: PropTypes.object,
  setCurrentEditTodo: PropTypes.any,
  currentEditTodo: PropTypes.any
};
export default TodoRow;