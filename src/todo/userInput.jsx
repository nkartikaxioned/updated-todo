import { Input } from "@/components/ui/input";
import { useContext, useId } from "react"
import { TodoContext } from ".";
import { MdLibraryAdd } from "react-icons/md";


export const UserInput = () => {
  const {
    todoData,
    setTodoValue,
    todoValue,
    setTodoData,
    userInputRef
  } = useContext(TodoContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formInput = userInputRef.current.value;
    if(formInput !== null || formInput.length > 0) setTodoData(); 
  }

  return (
    <form className="flex" onSubmit={handleFormSubmit}>
      <Input type="text" className="" ref={userInputRef}/>
      <button>
        <MdLibraryAdd size={30} className="md:cursor-pointer"/>
      </button>
    </form>
  )
}