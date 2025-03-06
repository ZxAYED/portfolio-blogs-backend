import { IContact, IUser } from './user.interface';
import { contactModel, userModel } from './user.model';

const createUserIntoDb = async (payload: IUser) => {
  const result = await userModel.create(payload)
  return result
}
const contactIntoDb = async (payload: IContact) => {
  const result = await contactModel.create(payload)
  return result
}
const contactDeleteIntoDb = async (payload: string) => {
  const result = await contactModel.findByIdAndDelete(payload)
  return result
}

const getAllUsersFromDb = async () => {
  const result = await userModel.find()

  return result
}

const getAllContactFromDb = async () => {
  const result = await contactModel.find()

  return result
}

export const userService = {
  createUserIntoDb, contactIntoDb,
  getAllUsersFromDb, contactDeleteIntoDb, getAllContactFromDb
}
