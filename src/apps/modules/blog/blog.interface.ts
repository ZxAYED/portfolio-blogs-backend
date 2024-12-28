import { Types } from "mongoose"

export interface IBlog {
    title: string,
    content: string,
    author: Types.ObjectId,
    isPublished: boolean,

}
export interface IQuery {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    page?: number;
    [key: string]: any;
}