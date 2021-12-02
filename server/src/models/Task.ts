import * as mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    name: String,
    check: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', TaskSchema);
export default Task;