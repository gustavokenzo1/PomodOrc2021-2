import React, { useState, useEffect } from 'react' 
import api from '../../services/api';
import ListForm from '../../components/Form/ListForm';
import './List.css';
import TaskForm from '../../components/Tasks/TaskForm';
    
export default function List() {

  const [isLogged, setIsLogged] = useState(false)
  const [isInTasks, setIsInTasks] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user')) {
        setIsLogged(true)
        handleTasklist()
    } else {
        setIsLogged(false)
    }

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

    const isTask = localStorage.getItem('list')

    if (isTask) {
      setIsInTasks(true)
    }

}, [isLogged, isInTasks])

  return (
    <div className="principal">
        <div className='listsMenu'>
          <div className='listsWrapper'>
            <div className='main-form'>
              {
                isInTasks ? <TaskForm /> : <ListForm />
              }
            </div>
            </div>
        </div>
    </div>

  );

}
