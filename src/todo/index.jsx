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

  const [todoValue, setTodoValue] = useState({
    id: "",
    content: "",
    checked: false,
    date: "",
  });
  const [todoData, setTodoData] = useState(() => {
    const storedTodo = localStorage.getItem(localKey);
    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  const [displayInput, setDisplayInput] = useState(false);
  const userInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(todoData));
  }, [todoData]);

  return (
    <TodoContext.Provider
      value={{
        todoData,
        setTodoValue,
        todoValue,
        setTodoData,
        userInputRef,
        time,
        currentDate,
        displayInput,
        setDisplayInput
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
