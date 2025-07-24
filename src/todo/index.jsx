import {
  createContext,
  use,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

export const TodoContext = createContext();
export const TodoDataProvider = ({ children }) => {
  const localKey = "Todo-App";
  const initialState = {
    todoData: () => {
      const storedTodo = localStorage.getItem(localKey);
      return storedTodo ? JSON.parse(storedTodo) : [];
    },
    displayInput: false,
    editTodoId: "",
    editTodoValue: "",
    filteredTodoData: [],
    filterValue: "all",
    theme: "light",
    emptyTodoMessage: "So peaceful... Add a task to bring some action 💡.",
    emptyCheckedMessage: "🕵️ Nothing to see here. Try changing the filter!",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "Toggle_Theme":
        return {
          ...state,
          theme: state.theme === "light" ? "dark" : "light",
        };

      case "checkbox_toggle":
        return {
          ...state,
          todoData: state.todoData.map((todo) =>
            todo.id === action.id
              ? { ...todo, checked: !todo.checked }
              : todo
          ),
        };

      case "Delete":
        return {
          ...state,
          todoData: state.todoData.filter(
            (element) => element.id !== action.id
          ),
        };

      case "Edit_todo":
        return {
          ...state,
          editTodoId: action.id,
          editTodoValue: action.currentTodoValue
        }

      default:
        return state;
    }
  };

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
        userInputRef,
        time,
        currentDate,
        generateId,
        state,
        dispatch,
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
};
