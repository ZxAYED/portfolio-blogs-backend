export interface IUser {
  name: string
  email: string
  password: string
  role: 'user'
  isBlocked?: boolean
}
export interface IContact {
  name: string
  email: string
  message: string
}