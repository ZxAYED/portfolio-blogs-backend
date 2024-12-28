import { model, Schema } from 'mongoose'
import { IUser } from './user.interface'
import bcrypt from 'bcryptjs'
import AppError from '../../Errorhandlers/AppError'
import config from '../../config'

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
      enum: ['admin', 'user'],
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

userSchema.pre('save', async function (next) {
  const isUserExists = await userModel.findOne({ email: this.email })
  if (isUserExists) {
    throw new AppError(401, 'User already exists')
  }
  const user = this
  const salt = await bcrypt.genSalt(parseInt(config.gen_salt, 10))

  user.password = await bcrypt.hash(user.password, salt)

  next()
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password
    return ret
  },
})
userSchema.set('toObject', {
  transform: function (doc, ret) {
    delete ret.password
    return ret
  },
})

export const userModel = model<IUser>('User', userSchema)
