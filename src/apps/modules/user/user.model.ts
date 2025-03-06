import { model, Schema } from 'mongoose'
import { IContact, IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)
const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})



export const userModel = model<IUser>('User', userSchema)
export const contactModel = model<IContact>('Contact', contactSchema)
