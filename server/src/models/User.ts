import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: String,
})

const User = mongoose.model('User', UserSchema);
export default User;