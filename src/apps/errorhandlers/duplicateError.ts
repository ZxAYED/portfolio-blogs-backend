import { IErrorResponse, IErrorSource } from './error.interface'

const handleDuplicateError = (err: unknown): IErrorResponse => {
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
    // eslint-disable-next-line no-constant-binary-expression
    message: `${msg} is already exits` || 'Duplicate entry found',
    errorSource,
  }
}
export default handleDuplicateError
