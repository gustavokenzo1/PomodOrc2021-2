import { Router } from 'express'
import TaskController from '../controllers/TaskController'

const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.post('/', (req, res) => {
    taskController.createTask(req,res)
})

taskRoutes.delete('/:id', (req, res) => {
    taskController.deleteTask(req,res)
})

taskRoutes.patch('/:id', (req, res) => {
    taskController.updateTask(req,res)
})

taskRoutes.get('/:id', (req, res) => {
    taskController.getOneTask(req,res)
})

taskRoutes.get('/', (req, res) => {
    taskController.getTasks(req,res)
})

export default taskRoutes