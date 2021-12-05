import { Request, Response } from 'express'
import User from '../models/User'

export default class SessionController {

    createUser = async (req: Request, res: Response) => {
        try {
            let user = await User.create(req.body)
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao criar usuário" })
        }
    }

    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const user = await User.findById(id)

            if (!user) {
                res.status(400).json({ message: "Usuário não existe" })
            }

            await user.updateOne(req.body)
            res.status(200).json({ message: "Usuário atualizado com sucesso" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao atualizar usuário" })
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            await User.findByIdAndDelete(id)
            res.status(200).json({ message: "Usuário deletado com sucesso" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao deletar usuário" })
        }
    }

    getUsers = async (req: Request, res: Response) => {
        try {
            let users = await User.find()
            res.status(200).json(users)
            
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao criar usuário" })
        }
    } 
}