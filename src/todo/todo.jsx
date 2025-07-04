import { useContext } from "react"
import { UserInput } from "./userInput";
import { TodoContext } from ".";


export const Todo = () => {

  const {
    todoData,
    setTodoValue,
    todoValue,
    setTodoData,
    userInputRef
  } = useContext(TodoContext);

  return (
    <div>
      <h2>Todo</h2>
      <UserInput />
    </div>
  );
}