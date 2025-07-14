import { useContext } from "react";
import { TodoContext } from ".";
import { MdOutlineDeleteSweep, MdOutlineEditNote } from "react-icons/md";

export const TodoList = () => {
  const {
    todoData,
    setTodoData,
    userInputRef,
    time,
    currentDate,
    displayInput,
    setDisplayInput,
    generateId,
    editTodo,
    setEditTodo
  } = useContext(TodoContext);

  const handleCheckBox = (elementId) => {
    const checkboxUpdated = todoData.map((element) =>
      element.id === elementId
        ? { ...element, checked: !element.checked }
        : element
    );

    setTodoData(checkboxUpdated);
  };

  const handleDelete = (id) => {
    const afterDelete = todoData.filter((element) => element.id !== id);
    setTodoData(afterDelete);
  };

  const handleEdit = (id) => {
    setEditTodo(id);

    
  }

  if (todoData.length > 0) {
    return (
      <table className="custom-orange-border">
        <thead>
          <tr>
            <th className="px-5 py-2.5 custom-orange-border table-bg-gradient">
              Status
            </th>
            <th className="px-5 py-2.5 custom-orange-border table-bg-gradient">
              Todo
            </th>
            <th className="px-5 py-2.5 custom-orange-border table-bg-gradient">
              Created at
            </th>
            <th className="px-5 py-2.5 custom-orange-border table-bg-gradient">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todoData.map((currentTodo) => {
            return (
              <tr key={currentTodo.id} className="custom-orange-border">
                <td className="px-5 py-2.5 text-center custom-orange-border">
                  <input
                    className="accent-orange-400"
                    checked={currentTodo.checked}
                    type="checkbox"
                    onChange={(e) => handleCheckBox(currentTodo.id)}
                  />
                </td>
                <td className="px-5 py-2.5 custom-orange-border">
                  {currentTodo.content}
                </td>
                <td className="flex flex-col text-center px-5 py-2.5">
                  <span>{currentTodo.time}</span>
                  <span className="pt-1.5">{currentTodo.date}</span>
                </td>
                <td className="custom-orange-border">
                  <button className="px-5 py-2.5 pr-1.5" title="Edit Todo">
                    <MdOutlineEditNote
                      size={25}
                      className="hover:fill-orange-400"
                      onClick={(e) => handleEdit(currentTodo.id)}
                    />
                  </button>
                  <button
                    className="px-5 py-2.5 pl-1.5"
                    title="Delete"
                    onClick={(e) => handleDelete(currentTodo.id)}
                  >
                    <MdOutlineDeleteSweep
                      size={22}
                      className="hover:fill-orange-400"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
