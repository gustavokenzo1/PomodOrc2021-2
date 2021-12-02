import React, { useState, useEffect } from "react";
import api from "../../services/api";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";
import "./TaskComponent.css";

function TaskForm() {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(true);
  const [taskId, setTaskId] = useState("");
  const [editText, setEditText] = useState("");
  const [task, setTask] = useState("");
  const [taskListName, setTaskListName] = useState("");
  const [taskName, setTaskName] = useState([] as any);
  const [preId, setPreId] = useState([] as any);
  const [counter, setCounter] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();

    const list_id = localStorage.getItem("list");

    if (input !== "") {
      if (list_id) {
        await api.post(`/tasks/${list_id}`, { name: input });
        window.location.reload();
      }
    } else {
      alert("Por favor, digite algum nome para a sua lista!");
    }
    setInput("");
  }

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  async function handleDelete(i: any) {
    window.location.reload();
  }

  async function handleEdit(task: any) {
    setEdit(!edit);
    setTaskId(task);


    preId.map((item) => console.log(item));
  }

  async function sendEdit() {
    if (editText) {
      await api.patch(`/tasklists/${taskId}`, {
        name: editText,
      });
      window.location.reload();
    }

    setEdit(!edit);
  }

  const list_id = localStorage.getItem("list");

  useEffect(() => {
    async function getTasks() {
      const response = await api.get(`/tasks/${list_id}`);
      setTaskListName(response.data.name);
      setTask(response.data.list);
    }

    async function convertTaskId() {
      let i = 0;
      for (i; i < task.length; i++) {
        const response = await api.get(`/tasks/one/${task[i]}`);
        taskName[i] = response.data.name;
        preId[i] = response.data._id;
      }
      setTaskName(taskName);
      setPreId(preId);
    }

    if (!task) {
      /* Se vc estiver lendo isso, saiba que foi uma gambiarra hehehe */
      setCounter(counter + 1);
    }

    getTasks();
    convertTaskId();
  }, [counter]);

  return (
    <>
      <div className="taskList">
        <h1> {taskListName} </h1>
        {edit ? (
          <div className="allTasks">
            {preId.map((task) => (
              <div key={task} className="taskCard">
                <div className="taskName">{task}</div>
                <div className="icons">
                  <RiIcons.RiEdit2Line onClick={() => handleEdit(task)} />
                  <RiIcons.RiDeleteBin6Line />
                  <ImIcons.ImCheckboxUnchecked size={16} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="allTasks">
            {preId.map((task) => (
              <div key={task} className="taskCard">
                {task !== taskId ? (
                  <div className="tasklistNames">{task.name}</div>
                ) : (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={handleEditChange}
                      className="editInput"
                    />
                    <div className="icons">
                      <FaIcons.FaCheckSquare
                        onClick={sendEdit}
                        className="checkIcon"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        <form autoComplete="off" className="taskForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite uma tarefa"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
          />
          <button className="todo-button">Adicionar Tarefa</button>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
