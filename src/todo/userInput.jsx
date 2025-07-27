import { useTodoContext } from ".";
import { MdLibraryAdd } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";

export const UserInput = () => {
  const {state, dispatch, userInputRef, time, currentDate, generateId } =
    useTodoContext();

  const id = generateId();

  // function to add new todo
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

      setTodoData({type: "Add_Todo", action: newTodo});

      userInputRef.current.value = "";
    }
  };

  return (
    <form className="flex w-3/5 md:w-1/2" onSubmit={handleFormSubmit}>
      <Textarea
        type="text"
        className="min-w-36"
        ref={userInputRef}
        placeholder="Need a remainder?"
      />
      <button className="ml-2">
        <MdLibraryAdd
          size={30}
          className="md:cursor-pointer"
          title="Add Todo"
        />
      </button>
    </form>
  );
};
