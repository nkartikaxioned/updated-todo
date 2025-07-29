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

  const initialState = {
    todoData: (() => {
      const storedTodo = localStorage.getItem(localKey);
      return storedTodo ? JSON.parse(storedTodo) : [];
    })(),
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
            todo.id === action.action ? { ...todo, checked: !todo.checked } : todo
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
          editTodoValue: action.currentTodoValue,
        };

      case "Cancel_Edit":
        return {
          ...state,
          editTodoValue: "",
          editTodoId: "",
        };

      case "Set_EditTodoValue":
        return {
          ...state,
          editTodoValue: action.action,
        };

      case "Save_Edit":
        return {
          ...state,
          todoData: totodoData.map((element) => {
            element.id === action.id
              ? {
                  ...element,
                  content: state.editTodoValue,
                  time: time,
                  currentDate: currentDate,
                }
              : element;
          }),
          editTodoId: "",
          editTodoValue: "",
        };

      case "Add_Todo":
        return {
          ...state,
          todoData: [...state.todoData, action.action],
        };

      case "Toggle_Input_Visibility":
        return {
          ...state,
          displayInput: !state.displayInput,
        };

      case "Set_Filter":
        return {
          ...state,
          filteredTodoData:
            action.action === "checked"
              ? state.todoData.filter((todo) => todo.checked)
              : state.todoData,
        };

      case "initial_filter":
        return {
          ...state,
          filteredTodoData: action.action
        }

      default:
        return state;
    }
  };

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
    localStorage.setItem(localKey, JSON.stringify(state.todoData));

    const filtered =
      state.filterValue === "checked"
        ? state.todoData.filter((todo) => todo.checked)
        : state.todoData;

    dispatch({type:"initial_filter", action:filtered});
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
