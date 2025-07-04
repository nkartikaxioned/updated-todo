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

  return (
    <form className="flex">
      <Input className="" ref={userInputRef}/>
      <button>
        <MdLibraryAdd size={30} className="md:cursor-pointer"/>
      </button>
    </form>
  )
}