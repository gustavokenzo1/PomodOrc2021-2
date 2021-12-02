import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './Task.css'

function Task() {

    const [tasklist, setTasklist] = useState([])
    const [taskName, setTaskName] = useState('')

    useEffect(() => { 
        async function getTasks() {
            const list_id = localStorage.getItem('list')
            
            if (list_id) {
                const response = await api.get(`/tasklists/${list_id}`)
                setTaskName(response.data.name)

                setTasklist(response.data.list)
            }
        }
        getTasks()
    }, [])

    return (
        <div className='principal-tasks'>
            <div className='task-menu'>
                <h1 className='task-title'> {taskName} </h1>
                <div className='tasks'>
                    { tasklist.map((item, i) => 
                        <div key={i} className='taskCard'> {item} </div>
                    ) }
                </div>
                <form autoComplete='off' className='task-form'>
                    <input 
                        type='text'
                        className='task-input'                   
                        />
                    <button className='task-button'>Adicionar tarefa</button>
                </form>
            </div>
        </div>
    )
}

export default Task
