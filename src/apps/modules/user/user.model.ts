import { model, Schema } from 'mongoose'
import { IContact, IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
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
