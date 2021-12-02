import React, { useState, useEffect } from "react";
import api from "../../services/api";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import "./ListComponent.css";

function ListForm() {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState([] as any);
  const [edit, setEdit] = useState(true);
  const [listId, setListId] = useState("");
  const [editText, setEditText] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const user_id = localStorage.getItem("user");

    if (input !== "") {
      if (user_id) {
        await api.post(
          "/tasklists",
          {
            name: input,
            list: [],
          },
          {
            headers: { user_id },
          }
        );
        window.location.reload();
      } else {
        alert("Entre na sua conta para ver as suas listas!");
      }
    } else {
      alert("Por favor, digite algum nome para a sua lista!");
    }
    setInput("");
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  async function handleDelete(_id: any) {
    await api.delete(`/tasklists/${_id}`);
    window.location.reload();
  }

  async function handleEdit(_id: any) {
    setEdit(!edit);
    setListId(_id);
  }

  async function sendEdit() {
    if (editText) {
      await api.patch(`/tasklists/${listId}`, {
        name: editText,
      });
      window.location.reload();
    }

    setEdit(!edit);
  }

  useEffect(() => {
    async function loadLists() {
      const user_id = localStorage.getItem("user");

      if (user_id) {
        const response = await api.get("/tasklists", {
          headers: { user_id },
        });

        setLists(response.data);
      }
    }
    loadLists();

    localStorage.removeItem("list");
  }, []);

  function storeId(_id: any) {
    localStorage.setItem("list", _id);
  }

  return (
    <>
      <div className="list-list">
        <h1>Listas de Tarefas</h1>
        {edit ? (
          <div className="all-lists">
            {lists.map((list) => (
              <div key={list._id} className="listCard">
                <a
                  href="/tasks"
                  className="redirect"
                  onClick={() => {
                    storeId(list._id);
                  }}
                >
                  <div className="tasklistName">{list.name}</div>
                </a>
                <div className="icons">
                  <RiIcons.RiEdit2Line
                    onClick={() => {
                      handleEdit(list._id);
                    }}
                  />
                  <RiIcons.RiDeleteBin6Line
                    onClick={() => {
                      handleDelete(list._id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="all-lists">
            {lists.map((list) => (
              <div key={list._id} className="listCard">
                {list._id !== listId ? (
                  <div className="tasklistName">{list.name}</div>
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
        <form autoComplete="off" className="list-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite um nome para a sua lista"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
          />
          <button className="todo-button">Adicionar Lista</button>
        </form>
      </div>
    </>
  );
}

export default ListForm;

/* 
"Tarefa atualizada 1", "Tarefa atualizada 2", "Tarefa atualizada 3"
0, 1, 2
true, false, false 
*/
