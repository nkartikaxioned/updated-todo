import { createContext, use, useEffect, useReducer, useRef, useState } from "react";

export const TodoContext = createContext();
export const TodoDataProvider = ({ children }) => {

  const localKey = "Todo-App";
  const initialState = {
    todoData: () => {
      const storedTodo = localStorage.getItem(localKey);
      return storedTodo ? JSON.parse(storedTodo) : [];
    },
    displayInput: false,
    editTodoValue: "",
    filteredTodoData: [],
    filterValue: "all",
    toggleDarkMode: "light",
    emptyTodoMessage: "So peaceful... Add a task to bring some action 💡.",
    emptyCheckedMessage: "🕵️ Nothing to see here. Try changing the filter!"
  }

  const reducer = (state, action) => {

  }

  const date = new Date();
  const currentDate = date.toLocaleDateString();
  const userInputRef = useRef(null);
  
  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const [editTodo, setEditTodo] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  // const [todoData, setTodoData] = useState(() => {
  //   const storedTodo = localStorage.getItem(localKey);
  //   return storedTodo ? JSON.parse(storedTodo) : [];
  // });

  // const [displayInput, setDisplayInput] = useState(false);

  // const [editTodoValue, setEditTodoValue] = useState("");
  // const [filteredTodoData, setFilteredTodoData] = useState([]);
  // const [filterValue, setFilterValue] = useState("all");
  // const [toggleDarkMode, setToggleDarkMode] = useState("light");

  // const [emptyTodoMessage, setEmptyTodoMessage] = useState(
  //   "So peaceful... Add a task to bring some action 💡."
  // );

  // const [emptyCheckedMessage, setEmptyCheckedMessage] = useState(
  //   "🕵️ Nothing to see here. Try changing the filter!"
  // );

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(todoData));

    const filtered =
      state.filterValue === "checked"
        ? state.todoData.filter((todo) => todo.checked)
        : state.todoData;

    reducer("filter", filtered);
  }, [state.todoData, state.filterValue]);

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
        toggleDarkMode, 
        setToggleDarkMode
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
