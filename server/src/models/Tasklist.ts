import * as mongoose from 'mongoose'

const TasklistSchema = new mongoose.Schema({
    name: String,
    list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Tasklist = mongoose.model('Tasklist', TasklistSchema);
export default Tasklist;