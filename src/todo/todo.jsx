import { useContext } from "react";
import { UserInput } from "./userInput";
import { TodoContext } from ".";
import { TodoList } from "./todoList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Todo = () => {
  const {
    todoData,
    displayInput,
    setDisplayInput,
    setFilteredTodoData,
  } = useContext(TodoContext);

  const handleButtonCLick = () => {
    setDisplayInput(!displayInput);
  };

  const handleValueChange = (value = "all") => {
    setFilteredTodoData(
      value === "checked" ? todoData.filter((todo) => todo.checked) : todoData
    );
  };

  return (
    <div className="wrapper">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-orange-400 font-semibold mb-6">Todo App :</h2>
        <div className="outline-0 ring-0 focus:ring-0 w-4/5">
          <Select
            defaultValue="all"
            onValueChange={(value) => handleValueChange(value)}
          >
            <SelectTrigger className="w-[180px] bg-gradient-to-r from-orange-400 to-orange-600 text-white focus:outline-none focus:ring-0 focus-visible:ring-0 border-none shadow-sm">
              <SelectValue className="text-white" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="focus:bg-orange-200" value="all">
                All
              </SelectItem>
              <SelectItem className="focus:bg-orange-200" value="checked">
                Checked
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {todoData && <TodoList />}
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
    </div>
  );
};
