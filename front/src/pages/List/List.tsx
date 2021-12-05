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
        await api.get('/tasklists')
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
