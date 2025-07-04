import { createContext, useEffect, useRef, useState } from "react";

export const TodoContext = createContext();
export const TodoDataProvider = ({ children }) => {
  const localKey = "Todo-App";
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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
