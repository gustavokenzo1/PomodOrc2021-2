import { Router } from 'express'
import TasklistController from '../controllers/TasklistController'

const tasklistRoutes = Router()
const tasklistController = new TasklistController()

tasklistRoutes.post('/', (req, res) => {
    tasklistController.createTasklist(req,res)
})

tasklistRoutes.delete('/:id', (req, res) => {
    tasklistController.deleteTasklist(req,res)
})

tasklistRoutes.patch('/:id', (req, res) => {
    tasklistController.updateTasklist(req,res)
})

tasklistRoutes.get('/:id', (req, res) => {
    tasklistController.getOneTasklist(req,res)
})

tasklistRoutes.get('/', (req, res) => {
    tasklistController.getUserTaskslist(req,res)
})

tasklistRoutes.get('/', (req, res) => {
    tasklistController.getAllTaskslist(req,res)
})

export default tasklistRoutes