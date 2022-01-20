import React, { useEffect, useState } from "react";
import TodoForm from "./components/todoForm/todoForm";
import TodoList from "./components/todoList/todoList";
import "./App.css";
import { todosDb } from "./firebase";
import Todo from "./interface/todo";

function App() {
  const [currentEditTodo, setCurrentEditTodo] = useState<Todo|null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [warning, setWarning] = useState<string|null>(null);

  useEffect(() => {
    todosDb.on('value', (snapshot) => {
      let items = snapshot.val();
      let todosFetched:Todo[] = [];
      //parse data in form of object into array
      for (let id in items) {
        todosFetched.push({
          id: id,
          title: items[id].title,
          complete: items[id].complete
        });
      }
      setTodos(todosFetched)
    });
  }, []);

  const handleToggleEditMode = (todo: any) => {
    if(currentEditTodo == null) {
      setCurrentEditTodo(todo);
    }else {
      setCurrentEditTodo(null);
    }
  }

  const handleSetWarning = (message: string|null) => {
    setWarning(message);
    setTimeout(() => {
      setWarning(null);
    }, 3000);
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>, value: any, setValue:any) => {
    e.preventDefault();
    if(value == "") {
      handleSetWarning("Todo must contain at least 1 character!");
      return;
    }
    const existTodo = todos.find(todo => todo.title == value);
    if(existTodo) {
      handleSetWarning("Todo is already existed!");
      return;
    }
    if(currentEditTodo == null) { //adding
      const item = {
        title: value,
        complete: false,
      };
      todosDb.push(item);
    }else { //edit
      todosDb.child(currentEditTodo.id).set({complete: currentEditTodo.complete, title: value});
      setCurrentEditTodo(null);
    }
    setValue("");
    setKeyword("");
  };

  return (
    <div className="app">
      <h1>TODO App</h1>
      <div className="container">
        <TodoForm
          currentEditTodo={currentEditTodo} 
          setKeyword={setKeyword}
          handleSubmit={handleSubmit}
        />
        {warning && 
          <div className="warning-message">
            <span>{warning}</span>
          </div>
        }
        <TodoList 
          setCurrentEditTodo={handleToggleEditMode} 
          keyword={keyword} 
          todos={todos}
          currentEditTodo={currentEditTodo}
        />
      </div>
    </div>
  );
}

export default App;