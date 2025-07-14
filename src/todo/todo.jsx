import { useContext } from "react";
import { UserInput } from "./userInput";
import { TodoContext } from ".";
import { TodoList } from "./todoList";

export const Todo = () => {
  const { todoData,  
     displayInput, 
     setDisplayInput 
    } = useContext(TodoContext);

  const handleButtonCLick = () => {
    setDisplayInput(!displayInput);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-orange-400 font-semibold mb-6">Todo App :</h2>
      { todoData && <TodoList /> }
      <div className="flex justify-center items-center pt-5">
        {displayInput && <UserInput />}
        <button
          className={` border border-orange-400 rounded-2xl px-3 py-1.5 table-bg-gradient ${
            displayInput ? "ml-3" : "ml-0"
          } `}
          onClick={handleButtonCLick}
        >
          {displayInput ? "Cancel" : "Create Todo"}
        </button>
      </div>
    </div>
  );
};
