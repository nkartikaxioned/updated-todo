import { useContext, useId } from "react";
import { TodoContext } from ".";
import { MdLibraryAdd } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

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

  const id = generateId();

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

      setTodoData((prev) => [...prev, newTodo]);

      userInputRef.current.value = "";
    }
  };

  return (
    <form className="flex" onSubmit={handleFormSubmit}>
      <Textarea
        type="text"
        className=""
        ref={userInputRef}
        placeholder="Need a remainder?"
      />
      <button className="ml-2">
        <MdLibraryAdd size={30} className="md:cursor-pointer" title="Add Todo"/>
      </button>
    </form>
  );
};
