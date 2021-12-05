import { Router } from 'express'
import SessionController from '../controllers/SessionController'

const userRoutes = Router()
const sessionController = new SessionController()

userRoutes.post('/', (req, res) => {
    sessionController.createUser(req, res)
})

userRoutes.get('/', (req, res) => {
    sessionController.getUsers(req, res)
})

userRoutes.delete('/:id', (req, res) => {
    sessionController.deleteUser(req,res)
})

userRoutes.patch('/:id', (req, res) => {
    sessionController.updateUser(req,res)
})

export default userRoutes