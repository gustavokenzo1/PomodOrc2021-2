import { Request, Response } from 'express'
import Task from '../models/Task';

export default class DashboardController {

    showDashboard = async (req: Request, res: Response) => {
        const { user_id } = req.headers;
        const tasks = await Task.find({ user: user_id });
        return res.json(tasks)
    }
}