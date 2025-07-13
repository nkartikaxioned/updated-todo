import { useContext } from "react"
import { UserInput } from "./userInput";
import { TodoContext } from ".";

export const Todo = () => {

  const {
    todoData,
    setTodoValue,
    todoValue,
    setTodoData,
    userInputRef,
    displayInput,
    setDisplayInput
  } = useContext(TodoContext);

  const handleButtonCLick = () => {
    setDisplayInput(!displayInput);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Todo</h2>
      <div className="flex justify-center items-center">
        {displayInput && <UserInput />}
        <button className="border border-black rounded-2xl px-3 py-1" onClick={handleButtonCLick}>{displayInput ? "Cancel" : "Create Todo"}</button>
      </div>
    </div>
  );
}