const Task = require('../models/Task')

module.exports = {
    async show(req, res) {
        const { user_id } = req.headers;

        const tasks = await Task.find({ user: user_id });

        return res.json(tasks)
    }
}