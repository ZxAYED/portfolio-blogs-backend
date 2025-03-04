"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../Errorhandlers/AppError"));
class QueryBuilder {
    constructor(QueryModel, query) {
        this.QueryModel = QueryModel;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.search) {
            const search = this.query.search;
            this.QueryModel = this.QueryModel.find({
                $or: searchableFields.map(field => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        var _a;
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.filter) {
            const QueryObj = Object.assign({}, this.query);
            const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page'];
            excludeFields.forEach(element => {
                delete QueryObj[element];
            });
            if (Object.keys(QueryObj).length) {
                this.QueryModel = this.QueryModel.find({ author: QueryObj.filter });
            }
        }
        return this;
    }
    sort() {
        var _a, _b, _c, _d, _e, _f;
        let sort = 'createdAt';
        if (((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || ((_b = this.query) === null || _b === void 0 ? void 0 : _b.sortOrder)) {
            let sortOrder = 'asc';
            if ((_c = this.query) === null || _c === void 0 ? void 0 : _c.sortOrder) {
                sortOrder = (_d = this.query) === null || _d === void 0 ? void 0 : _d.sortOrder;
            }
            if (sortOrder !== 'asc' && sortOrder !== 'desc') {
                throw new AppError_1.default(400, "Sort Order of the this.query only receives 'asc' or 'desc'. Nothing else.");
            }
            sort = sortOrder === 'desc' ? `-${(_e = this.query) === null || _e === void 0 ? void 0 : _e.sortBy}` : `${(_f = this.query) === null || _f === void 0 ? void 0 : _f.sortBy}`;
        }
        this.QueryModel = this.QueryModel.sort(sort).select('-__V');
        return this;
    }
    pagination() {
        let page = 1;
        let limit = 100;
        let skip = 0;
        if (this.query.limit) {
            limit = Number(this.query.limit);
        }
        if (this.query.page) {
            page = Number(this.query.page);
            skip = (page - 1) * limit;
        }
        this.QueryModel = this.QueryModel.skip(skip).limit(limit);
        return this;
    }
}
exports.default = QueryBuilder;
