import { useContext } from "react";
import { TodoContext } from ".";
import { MdDelete, MdOutlineCancel, MdOutlineEditNote } from "react-icons/md";
import { IoMdSave } from "react-icons/io";

export const TodoList = () => {
  const {
    todoData,
    setTodoData,
    time,
    currentDate,
    editTodo,
    setEditTodo,
    editTodoValue,
    setEditTodoValue,
    filteredTodoData,
    setFilteredTodoData,
  } = useContext(TodoContext);

  //function to handle toggle checkbox and update the array data
  const handleCheckBox = (elementId) => {
    const checkboxUpdated = todoData.map((element) =>
      element.id === elementId
        ? { ...element, checked: !element.checked }
        : element
    );

    setTodoData(checkboxUpdated);
  };

  //function to remove/reset id of currently edited element
  const handleDelete = (id) => {
    const afterDelete = todoData.filter((element) => element.id !== id);
    setTodoData(afterDelete);
  };

  //function to set id and value of currently edited element
  const handleEdit = (todo, e) => {
    setEditTodo(todo.id);
    setEditTodoValue(todo.content);
  };

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

  if (filteredTodoData.length > 0) {
    return (
      <table className="custom-orange-border shadow mt-5">
        <thead>
          <tr className="text-white table-bg-gradient">
            <th className="px-5 py-2.5">Status</th>
            <th className="px-5 py-2.5">Todo</th>
            <th className="px-5 py-2.5">Created at</th>
            <th className="px-5 py-2.5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodoData.map((currentTodo) => {
            return (
              <tr key={currentTodo.id} className="hover:bg-orange-100 h-24">
                <td className="px-5 py-2.5 text-center h-24">
                  <input
                    className="accent-orange-400 h-4 w-4"
                    checked={currentTodo.checked}
                    type="checkbox"
                    onChange={(e) => handleCheckBox(currentTodo.id)}
                  />
                </td>
                <td
                  className={`px-5 py-2.5 w-80 ${
                    currentTodo.checked
                      ? "line-through decoration-orange-700"
                      : null
                  }`}
                >
                  {editTodo === currentTodo.id ? (
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
                  <span>{currentTodo.time}</span>
                  <span className="pt-0.5">{currentTodo.date}</span>
                </td>
                <td className="align-middle text-center">
                  {editTodo === currentTodo.id ? (
                    <>
                      <button className="px-5 py-2.5 pr-1.5" title="Edit Todo">
                        <MdOutlineCancel
                          size={20}
                          className="hover:fill-orange-400"
                          title="Cancel Edit"
                          onClick={() => handleCancle()}
                        />
                      </button>
                      <button
                        className="px-5 py-2.5 pl-1.5"
                        title="Save"
                        onClick={() => handlesave(currentTodo.id)}
                      >
                        <IoMdSave size={20} className="hover:fill-red-500" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-5 py-2.5 pr-1.5" title="Edit Todo">
                        <MdOutlineEditNote
                          size={25}
                          className="hover:fill-orange-400"
                          onClick={(e) => handleEdit(currentTodo, e)}
                        />
                      </button>
                      <button
                        className="px-5 py-2.5 pl-1.5"
                        title="Delete"
                        onClick={() => handleDelete(currentTodo.id)}
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
