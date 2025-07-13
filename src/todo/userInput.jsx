import { Input } from "@/components/ui/input";
import { useContext, useId } from "react";
import { TodoContext } from ".";
import { MdLibraryAdd } from "react-icons/md";

export const UserInput = () => {
  const {
    todoData,
    setTodoData,
    userInputRef,
    time,
    currentDate,
    displayInput,
    setDisplayInput,
    generateId,
  } = useContext(TodoContext);

  const id = generateId;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formInput = userInputRef.current.value;
    if (formInput !== null || formInput.length > 0) {
      const newTodo = {
        id: id,
        content: formInput,
        checked: false,
        date: currentDate,
        time: time,
      };
      console.log(
        "id:" + id,
        "content:" + formInput,
        "checked:" + false,
        "date:" + currentDate,
        "time:" + time
      );
      setTodoData((prev) => [...prev, newTodo]);

      userInputRef.current.value = "";
    }
  };

  return (
    <form className="flex" onSubmit={handleFormSubmit}>
      <Input
        type="text"
        className=""
        ref={userInputRef}
        placeholder="Need a remainder?"
      />
      <button>
        <MdLibraryAdd size={30} className="md:cursor-pointer" />
      </button>
    </form>
  );
};
