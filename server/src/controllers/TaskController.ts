import Task from '../models/Task';
import User from '../models/User'

module.exports = {
    async index(req: any, res: any) {
        const { list } = req.query;

        const tasks = await Task.find({ lists: list });
        
        return res.json(tasks)
    },

    async store(req: any, res: any) {
        const { list } =  req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe!' })
        }

        const task = await Task.create({
            user: user_id,
            list
        })

        return res.json(task)
    }
}