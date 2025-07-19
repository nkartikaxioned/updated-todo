import { useTodoContext } from "@/todo";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export const DarkMode = () => {
  const { toggleDarkMode, setToggleDarkMode } = useTodoContext();

  const handleToggle = () => {
    return setToggleDarkMode((prev) => prev === "light" ? "dark" : "light");
  }

  return (
    <button className="switch mt-4" onClick={handleToggle}>
      <span className= {`slider ${toggleDarkMode === "light" ? 'light' : 'dark'}`}>{ toggleDarkMode === "light" ? <MdOutlineLightMode size={14}/> : <MdOutlineDarkMode /> }</span>
    </button>
  )
};
