import { IContact, IUser } from './user.interface';
import { contactModel, userModel } from './user.model';

import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../Errorhandlers/AppError";




const loginUser = async (data: { email: string; password: string }) => {
  const email = data.email.toLowerCase();
  const userData = await userModel.findOne({ email });

  
  if (!userData) {
    throw new AppError(404, "User not found!");
  }


  if (data.password !== userData.password) {
    throw new AppError(403, "You have given a wrong password!");
  }

  const tokenPayload = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
    image: userData.image,
  };

  const accessToken = jwt.sign(
    tokenPayload,
    config.accessToken_secret as string,
    { expiresIn:Number( config.accessToken_expiresIn) }
  );

  return {
    accessToken
  };
};


const createUserIntoDb = async (payload: IUser) => {
  const result = await userModel.create(payload)
  return result
}
const deleteUserIntoDb = async (payload: string) => {
  const result = await userModel.findByIdAndDelete(payload)

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
  createUserIntoDb, contactIntoDb, deleteUserIntoDb,
  getAllUsersFromDb, contactDeleteIntoDb, getAllContactFromDb,loginUser
}
