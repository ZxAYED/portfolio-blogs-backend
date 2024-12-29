import { JwtPayload } from "jsonwebtoken"

export interface IErrorResponse {
  message: string
  statusCode: number
  errorSource: IErrorSource[]
}

export type TRole = 'admin' | 'user'

export interface IDecoded {
  userEmail: string,
  role: TRole
}

export interface CustomError {
  statusCode?: number;
  message?: string;
  stack?: string;
  errors?: any;
  addError?: (err: any) => void
}
export interface IErrorSource {
  path: string;
  message: string;
}
export interface CustomRequest extends Request {
  user?: JwtPayload,
  headers: any
}
