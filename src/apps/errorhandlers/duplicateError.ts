import { IErrorResponse, IErrorSource } from './error.interface'

const handleDuplicateError = (err: any): IErrorResponse => {
  const match = err.message.match(/"([^"]*)"/)
  const msg = match && match[1]
  const errorSource: IErrorSource[] = [
    {
      path: 'No path found',
      message: `${msg} is already exists`,
    },
  ]
  const statusCode = 400
  return {
    statusCode,

    message: `${msg} is already exits` || 'Duplicate entry found',
    errorSource,
  }
}
export default handleDuplicateError
