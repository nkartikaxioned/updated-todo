import { useTodoContext } from ".";
import { MdDelete, MdOutlineCancel, MdOutlineEditNote } from "react-icons/md";
import { IoMdSave } from "react-icons/io";

export const TodoList = () => {
  const {
    time,
    currentDate,
    state,
    dispatch
  } = useTodoContext();

  //function to cancel edit
  const handleCancle = () => {
    setEditTodo(null);
  };

  //function to save the updated data and empty setEditTodo and setEditTodoValue
  const handlesave = (id) => {
    const editedTodoList = todoData.map((element) =>
      element.id === id
        ? {
            ...element,
            content: editTodoValue,
            time: time,
            currentDate: currentDate,
          }
        : element
    );
    setTodoData(editedTodoList);
    setEditTodo(null);
    setEditTodoValue(null);
  };

  if (filteredTodoData.length === 0) {
    return (
      <div
        className={`p-20 ${
          toggleDarkMode === "dark" ? "text-white" : "text-black"
        }`}
      >
        {emptyCheckedMessage}
      </div>
    );
  }

  if (filteredTodoData.length > 0) {
    return (
      <table className="custom-orange-border shadow mt-5">
        <thead>
          <tr className="text-white table-bg-gradient">
            <th className="px-3.5 md:px-5 py-2.5">Status</th>
            <th className="px-3.5 md:px-5 py-2.5">Todo</th>
            <th className="px-3.5 md:px-5 py-2.5">Created at</th>
            <th className="px-3.5 md:px-5 py-2.5">Actions</th>
          </tr>
        </thead>
        <tbody
          className={`${
            toggleDarkMode === "dark" ? "bg-orange-100" : "bg-transparent"
          }`}
        >
          {state.filteredTodoData.map((currentTodo) => {
            return (
              <tr
                key={currentTodo.id}
                className={`h-24 ${
                  toggleDarkMode === "dark"
                    ? "hover:bg-orange-200"
                    : "hover:bg-orange-100"
                }`}
              >
                <td className="px-3.5 md:px-5 py-2.5 text-center h-24">
                  <input
                    className="accent-orange-400 h-3.5 md:h-4 w-3.5 md:w-4"
                    checked={currentTodo.checked}
                    type="checkbox"
                    onChange={(e) => dispatch({type: "checkbox_toggle", action: currentTodo.id})}
                  />
                </td>
                <td
                  className={`px-3.5 md:px-5 py-2.5 w-80 text-[14px] md:text-[16px] ${
                    currentTodo.checked
                      ? "line-through decoration-orange-700"
                      : null
                  }`}
                >
                  {editTodoId === currentTodo.id ? (
                    <textarea
                      className="border border-orange-400 rounded-md max-h-20 focus:outline-none"
                      value={editTodoValue}
                      onChange={(e) => setEditTodoValue(e.target.value)}
                    ></textarea>
                  ) : (
                    currentTodo.content
                  )}
                </td>
                <td className="flex flex-col text-center px-5 py-2.5 text-gray-500 h-24 justify-center">
                  <span className="text-[12px] md:text-[14px]">
                    {currentTodo.time}
                  </span>
                  <span className="pt-0.5 text-[12px] md:text-[14px]">
                    {currentTodo.date}
                  </span>
                </td>
                <td className="align-middle text-center">
                  {editTodoId === currentTodo.id ? (
                    <>
                      <button
                        className="px-0 md:px-5 py-2.5 pr-1.5"
                        title="Edit Todo"
                      >
                        <MdOutlineCancel
                          size={20}
                          className="hover:fill-orange-400"
                          title="Cancel Edit"
                          onClick={() => dispatch({type: "Cancel_Edit"})}
                        />
                      </button>
                      <button
                        className="px-0 md:px-5 py-2.5 pl-1.5"
                        title="Save"
                        onClick={() => handlesave(currentTodo.id)}
                      >
                        <IoMdSave size={20} className="hover:fill-red-500" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-0 md:px-5 py-2.5 pr-1.5"
                        title="Edit Todo"
                      >
                        <MdOutlineEditNote
                          size={25}
                          className="hover:fill-orange-400"
                          onClick={(e) => dispatch({type: "Edit_todo", id: currentTodo.id, currentTodoValue: currentTodo.content})}
                        />
                      </button>
                      <button
                        className="px-0 md:px-5 py-2.5 pl-1.5"
                        title="Delete"
                        onClick={() => dispatch({type: "Delete", action: currentTodo.id})}
                      >
                        <MdDelete size={20} className="hover:fill-red-500" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
