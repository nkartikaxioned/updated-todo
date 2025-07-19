import { createContext, use, useEffect, useRef, useState } from "react";

export const TodoContext = createContext();
export const TodoDataProvider = ({ children }) => {
  const localKey = "Todo-App";
  const date = new Date();
  
  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const currentDate = date.toLocaleDateString();

  const [todoData, setTodoData] = useState(() => {
    const storedTodo = localStorage.getItem(localKey);
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  const [displayInput, setDisplayInput] = useState(false);
  const userInputRef = useRef(null);

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const [editTodo, setEditTodo] = useState("");

  const [editTodoValue, setEditTodoValue] = useState("");
  const [filteredTodoData, setFilteredTodoData] = useState([]);
  const [filterValue, setFilterValue] = useState("all");

  const [emptyTodoMessage, setEmptyTodoMessage] = useState(
    "So peaceful... Add a task to bring some action 💡."
  );

  const [emptyCheckedMessage, setEmptyCheckedMessage] = useState(
    "🕵️ Nothing to see here. Try changing the filter!"
  );

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(todoData));

    const filtered =
      filterValue === "checked"
        ? todoData.filter((todo) => todo.checked)
        : todoData;

    setFilteredTodoData(filtered);
  }, [todoData, filterValue]);

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
        setEditTodoValue,
        filteredTodoData,
        setFilteredTodoData,
        filterValue,
        setFilterValue,
        emptyTodoMessage,
        emptyCheckedMessage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

//custom Hook to reduce import lines 
export const useTodoContext = () => {
  const context = use(TodoContext);
  return context;
}
