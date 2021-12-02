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

tasklistRoutes.patch('/name/:id', (req, res) => {
    tasklistController.updateTasklistName(req,res)
})

tasklistRoutes.get('/', (req, res) => {
    tasklistController.getUserTaskslist(req,res)
})


export default tasklistRoutes