import React, { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);  // To store the list of tasks
  const [input, setInput] = useState("");  // It will handle the input of any input text box
  const [editId, setEditId] = useState(null);  // edit id will be used to identify which task is being edited
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (!input.trim()) return;
 
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id) => {
    if(editText.trim() === "") {
      setTasks(tasks.filter((task) => task.id !== id));
    }
    else{
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
        )
      );
    }
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleSave(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="actions">
                  <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
