import { useTodoContext } from "@/todo";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export const DarkMode = () => {
  const { state, dispatch } = useTodoContext();

  return (
    <button
      className="switch mt-4"
      onClick={() => dispatch({ type: "Toggle_Theme" })}
    >
      <span className={`slider ${state.theme === "light" ? "light" : "dark"}`}>
        {state.theme === "light" ? (
          <MdOutlineLightMode size={14} />
        ) : (
          <MdOutlineDarkMode />
        )}
      </span>
    </button>
  );
};
