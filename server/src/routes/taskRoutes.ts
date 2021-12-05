import { Router } from 'express'
import TaskController from '../controllers/TaskController'

const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.post('/:id', (req, res) => {
    taskController.createTask(req,res)
})

taskRoutes.get('/:id', (req, res) => {
    taskController.getAllTasks(req,res)
})

taskRoutes.get('/one/:id', (req, res) => {
    taskController.getOneTask(req,res)
})

taskRoutes.patch('/:id', (req, res) => {
    taskController.updateTask(req,res)
})

taskRoutes.delete('/', (req, res) => {
    taskController.deleteTask(req,res)
})




export default taskRoutes