import React, { useState, useEffect } from 'react' 
import api from '../../services/api';
import ListForm from '../../components/Form/ListForm';
import './List.css';
    
export default function List() {

  const [isLogged, setIsLogged] = useState(false)
  const [todos, setTodos] = useState([])


  const addTodo = todo => {
    if(!todo.text || /^\s*$/.test(todo.text)) {
        return
    }

    const newTodos = [todo, ...todos] as any

    setTodos(newTodos)

}

  useEffect(() => {
    if (localStorage.getItem('user')) {
        setIsLogged(true)
        handleTasklist()
    } else {
        setIsLogged(false)
    }

    const user_id = localStorage.getItem('user')

    async function handleTasklist() {
        const response = await api.get('/tasklists')

        console.log(response.data[0].list)

        /* 
        TODO
        1. Função que pega o id da lista ao clicar nela {
          - get da api as tasklists do user_id guardada no localStorage
          - fazer um loop por todas as listas do usuário, em que a posição da 
            lista no backend == posição da lista clicada
        }

        2. {
          - redirecionar até uma página para criar uma tarefa
          - pegar o que foi escrito nessa tarefa
          - enviar o que foi escrito como um elemento da [] da lista (append)
        }
        */
    }
}, [isLogged])

  return (
    <div className="principal">
        <div className='listsMenu'>
          <div className='listsWrapper'>
            <h1 className='list-title'>Listas de Tarefas</h1>
            <div className='main-form'>
              <ListForm />
            </div>
            </div>
        </div>
    </div>

  );

}
