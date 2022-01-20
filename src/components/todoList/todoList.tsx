import React, {useState, useEffect} from "react";
import TodoRow from "../todo/todo"; //component
import {todosDb} from "../../firebase";
import Todo from "../../interface/todo";

interface TodoListProps {
  todos: Todo[],
  keyword: string,
  setCurrentEditTodo: any,
  currentEditTodo: Todo | null
}

function TodoList({ todos, keyword, setCurrentEditTodo, currentEditTodo }: TodoListProps) {
  let isEmpty = true;
  return (
    <div className="todo-list-container">
      {todos.map((todo: any) => {
        if(todo.title.match(keyword)) {
          isEmpty = false
          return (
            <React.Fragment key={todo.id}>
              <TodoRow  todo={todo} setCurrentEditTodo={setCurrentEditTodo} currentEditTodo={currentEditTodo}/>
            </React.Fragment>
          )
        }
      })}
      {isEmpty && <p>No results! Create new one.</p>}
    </div>
  );
}
export default TodoList;