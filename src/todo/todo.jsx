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
    emptyTodoMessage,
  } = useContext(TodoContext);

  //function to toggle textarea for adding todo
  const handleButtonCLick = () => {
    setDisplayInput(!displayInput);
  };

  //function to filter the data based on dropdown data
  const handleValueChange = (value = "all") => {
    setFilteredTodoData(
      value === "checked" ? todoData.filter((todo) => todo.checked) : todoData
    );
  };

  return (
    <div className="wrapper">
      <div className="flex flex-col justify-center items-center">
        <h2 className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent font-bold mb-6 mt-12">
          Todo App :
        </h2>
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
        {todoData.length === 0 && (
          <div className="p-20">{emptyTodoMessage}</div>
        )}
        {todoData.length > 0 && <TodoList />}
        <div className="flex justify-center items-center pt-5 w-full md:w-4/5">
          {displayInput && <UserInput />}
          <button
            className={` border border-orange-400 rounded-2xl px-3 py-1.5 table-bg-gradient text-white font-semibold ${
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
