export interface IUser {
  name: string
  email: string
  password: string
  role: 'user'
  isBlocked?: boolean
}
