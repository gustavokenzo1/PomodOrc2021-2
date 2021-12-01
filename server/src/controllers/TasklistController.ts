import { Request, Response } from 'express'
import User from '../models/User'
import Tasklist from '../models/Tasklist'

export default class TasklistController {
    createTasklist = async (req: Request, res: Response) => {
        const { list, name } =  req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        try {

            if (!user) {
                return res.status(400).json({ error: 'Usuário não existe!' })
            }

            let tasklist = await Tasklist.create({
                user: user_id,
                list,
                name
            })

            res.status(200).json(tasklist)

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao criar lista" })
        }
    }

    deleteTasklist = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            await Tasklist.findByIdAndDelete(id)
            res.status(200).json({ message: "Lista deletada com sucesso" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao deletar lista" })
        }
    }

    updateTasklist = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const tasklist = await Tasklist.findById(id)

            if (!tasklist) {
                res.status(400).json({ message: "A lista não existe" })
            }

            await tasklist.updateOne(req.body)
            res.status(200).json({ message: "A lista foi atualizada com sucesso" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao atualizar a lista" })
        }
    }

    getUserTaskslist = async (req: Request, res: Response) => {

        const { user_id } = req.headers;
        const taskslists = await Tasklist.find({ user: user_id });
        return res.json(taskslists)
        
    }

    getOneTasklist = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            let tasklist = await Tasklist.findById(id)
            res.status(200).json(tasklist)

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao listar lista" })
        }
    }

    getAllTaskslist = async (req: Request, res: Response) => {

        const taskslists = await Tasklist.find();
        return res.json(taskslists)
    }
}
