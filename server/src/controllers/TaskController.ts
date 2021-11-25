import { Request, Response } from 'express'
import Task from '../models/Task';
import User from '../models/User'

export default class TaskController {

    createTask = async (req: Request, res: Response) => {
        const { list } =  req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        try {

            if (!user) {
                return res.status(400).json({ error: 'Usuário não existe!' })
            }

            let task = await Task.create({
                user: user_id,
                list
            })

            res.status(200).json(task)

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao criar tarefa" })
        }
    }

    deleteTask = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            await Task.findByIdAndDelete(id)
            res.status(200).json({ message: "Tarefa deletada com sucesso" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao deletar tarefa" })
        }
    }

    updateTask = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const task = await Task.findById(id)

            if (!task) {
                res.status(400).json({ message: "A tarefa não existe" })
            }

            await task.updateOne(req.body)
            res.status(200).json({ message: "A tarefa foi atualizada com sucesso" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao atualizar a tarefa" })
        }
    }

    getTasks = async (req: Request, res: Response) => {

        try {
            let tasks = await Task.find()
            res.status(200).json(tasks)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao listar tarefas" })
        }
    }

    getOneTask = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            let task = await Task.findById(id)
            res.status(200).json(task)

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao listar tarefa" })
        }
    }
}