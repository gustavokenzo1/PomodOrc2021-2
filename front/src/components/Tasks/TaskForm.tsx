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
  const [tasks, setTasks] = useState([] as any);
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

  async function handleDelete(_id: any) {
    const tasklist_id = localStorage.getItem("list");
    localStorage.removeItem('task')

    if (tasklist_id) {
      await api.delete("/tasks", {
        headers: {
          id: _id,
          tasklist_id,
        },
      });
    }

    window.location.reload();
  }

  async function handleEdit(task: any) {
    setEdit(!edit);
    setTaskId(task);
  }

  async function sendEdit() {
    if (editText) {
      await api.patch(`/tasks/${taskId}`, {
        name: editText,
      });
      window.location.reload();
    }

    setEdit(!edit);
  }

  async function handleCheck(_id, boolean: boolean) {
    await api.patch(`/tasks/${_id}`, { check: boolean });
    window.location.reload();
  }

  const list_id = localStorage.getItem("list");

  function handleRedirect(_id) {
    localStorage.setItem('task', _id)
  }

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
        tasks[i] = response.data;
      }
      setTasks(tasks);
    }

    if (!task) {
      /* Se vc estiver lendo isso, saiba que foi uma gambiarra hehehe */
      setCounter(counter + 1);
    }

    getTasks();
    convertTaskId();
  }, [counter, list_id, task, tasks]);

  return (
    <>
      <div className="taskList">
        <h1 className='listName' > {taskListName} </h1>
        <h5 className='aviso' >Clique em uma tarefa para selecioná-la no timer</h5>
        {edit ? (
          <div className="allTasks">
            {tasks.map((task) => (
              <a href='/' key={task._id} className="taskCard" onClick={() => handleRedirect(task._id)}>
                <div className="taskName">{task.name}</div>
                <div className="icons">
                  <RiIcons.RiEdit2Line onClick={() => handleEdit(task._id)} />
                  <RiIcons.RiDeleteBin6Line
                    onClick={() => handleDelete(task._id)}
                  />
                  {task.check ? (
                    <ImIcons.ImCheckboxChecked
                    className='checkBox'
                      style={{'fill':'rgb(0, 218, 0)'}}
                      onClick={() => handleCheck(task._id, false)}
                    />
                  ) : (
                    <ImIcons.ImCheckboxUnchecked
                    className='checkBox'
                      onClick={() => handleCheck(task._id, true)}
                    />
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="allTasks">
            {tasks.map((task) => (
              <div key={task._id} className="taskCard">
                {task._id !== taskId ? (
                  <div className="taskName">{task.name}</div>
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
