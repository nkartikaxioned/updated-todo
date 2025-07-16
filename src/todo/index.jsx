import { createContext, useEffect, useRef, useState } from "react";

export const TodoContext = createContext();
export const TodoDataProvider = ({ children }) => {
  const localKey = "Todo-App";
  const date = new Date();
  const time = date.toLocaleTimeString([], {
    hour : 'numeric',
    minute : 'numeric',
    hour12: true,
  }); 

  const currentDate = date.toLocaleDateString();

  const [todoData, setTodoData] = useState(() => {
    const storedTodo = localStorage.getItem(localKey);
    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  
  const [displayInput, setDisplayInput] = useState(false);
  const userInputRef = useRef(null);
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const [editTodo, setEditTodo] = useState("");
  const [editTodoValue, setEditTodoValue] = useState("");
  
  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(todoData));
  }, [todoData]);

  return (
    <TodoContext.Provider
      value={{
        todoData,
        setTodoData,
        userInputRef,
        time,
        currentDate,
        displayInput,
        setDisplayInput,
        generateId,
        editTodo,
        setEditTodo,
        editTodoValue, 
        setEditTodoValue
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
