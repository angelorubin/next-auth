import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4() },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
