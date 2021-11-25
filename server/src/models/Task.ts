import * as mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    list: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', TaskSchema);
export default Task;