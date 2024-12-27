
export interface IErrorSource {
    path: string | number;
    message: string;
}
export interface IErrorResponse {
    message: string,
    statusCode: number,
    errorSource: IErrorSource[]
}