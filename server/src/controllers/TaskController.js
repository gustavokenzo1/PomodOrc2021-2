const Task = require('../models/Task')
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const { list } = req.query;

        const tasks = await Task.find({ lists: list });

        return res.json(tasks)
    },

    async store(req, res) {
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