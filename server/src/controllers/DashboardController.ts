import Task from '../models/Task';

module.exports = {
    async show(req: any, res: any) {
        const { user_id } = req.headers;

        const tasks = await Task.find({ user: user_id });

        return res.json(tasks)
    }
}