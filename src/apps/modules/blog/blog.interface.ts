
export interface IBlog {
  title: string
  content: string
  author: string
  isPublished: boolean
  imageUrl: string
}
export interface IQuery {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  limit?: number
  page?: number
  [key: string]: any
}
