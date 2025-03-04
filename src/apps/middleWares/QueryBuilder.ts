import { Query } from 'mongoose'
import AppError from '../Errorhandlers/AppError'
import { IQuery } from '../modules/project/project.interface'

class QueryBuilder<T> {
  public QueryModel: Query<T[], T>
  public query: IQuery
  constructor(QueryModel: Query<T[], T>, query: IQuery) {
    this.QueryModel = QueryModel
    this.query = query
  }

  search(searchableFields: string[]) {
    if (this.query?.search) {
      const search = this.query.search
      this.QueryModel = this.QueryModel.find({
        $or: searchableFields.map(field => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      })
    }
    return this
  }

  filter() {
    if (this.query?.filter) {
      const QueryObj = { ...this.query }
      const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page']
      excludeFields.forEach(element => {
        delete QueryObj[element]
      })
      if (Object.keys(QueryObj).length) {
        this.QueryModel = this.QueryModel.find({ author: QueryObj.filter })
      }
    }
    return this
  }
  sort() {
    let sort = 'createdAt';
    if (this.query?.sortBy || this.query?.sortOrder) {
      let sortOrder = 'asc';
      if (this.query?.sortOrder) { sortOrder = this.query?.sortOrder; }
      if (sortOrder !== 'asc' && sortOrder !== 'desc') {
        throw new AppError(400, "Sort Order of the this.query only receives 'asc' or 'desc'. Nothing else.");

      }
      sort = sortOrder === 'desc' ? `-${this.query?.sortBy}` : `${this.query?.sortBy}`
    }

    this.QueryModel = this.QueryModel.sort(sort).select('-__V')
    return this
  }

  pagination() {
    let page = 1
    let limit = 100
    let skip = 0
    if (this.query.limit) {
      limit = Number(this.query.limit)
    }
    if (this.query.page) {
      page = Number(this.query.page)
      skip = (page - 1) * limit
    }
    this.QueryModel = this.QueryModel.skip(skip).limit(limit)
    return this
  }
}
export default QueryBuilder
