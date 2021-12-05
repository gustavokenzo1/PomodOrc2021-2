import { Request, Response } from 'express'
import Task from '../models/Task';
import User from '../models/User'
import Tasklist from '../models/Tasklist';

export default class TaskController {

    createTask = async (req: Request, res: Response) => {
        /* const { list, name } =  req.body; */
        const { id } = req.params;

        const tasklist = await Tasklist.findById(id);

        try {

            if (!tasklist) {
                return res.status(400).json({ error: 'Lista não existe!' })
            }

            let task = await Task.create(req.body)

            await tasklist.updateOne({$push:{list: task}});
            res.status(200).json({ message: "Tarefa adicionada com sucesso" })
            
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao criar lista" })
        }
    }
    
    getAllTasks = async (req: Request, res: Response) => {

        const { id } = req.params
        
        try {
            const data = await Tasklist.findById(id)
            res.status(200).json(data)
            
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao listar tarefa" })
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

    updateTask = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const tasklist = await Task.findById(id)

            if (!tasklist) {
                res.status(400).json({ message: "A tarefa não existe" })
            }

            await tasklist.updateOne(req.body)
            res.status(200).json({ message: "A tarefa foi atualizada com sucesso" })

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao atualizar a tarefa" })
        }
    }

    deleteTask = async (req: Request, res: Response) => {

        const { id } = req.headers
        const { tasklist_id } = req.headers
        const tasklist = await Tasklist.findById(tasklist_id);

        try {
            await Task.findByIdAndDelete(id)
            await tasklist.updateOne({$pull:{list: id}});
            
            res.status(200).json("Tarefa deleteda com sucesso")
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Erro ao deletar tarefa" })
        }
    }
}