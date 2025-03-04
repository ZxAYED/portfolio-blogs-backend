"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
blogSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({
        $lookup: {
            from: 'User',
            localField: 'author',
            foreignField: '_id',
            as: 'authorDetails',
        },
    }, {
        $unwind: '$authorDetails',
    }, {
        $match: { 'authorDetails.isBlocked': false },
    }, {
        $project: {
            title: 1,
            content: 1,
            author: {
                _id: '$authorDetails._id',
                name: '$authorDetails.username',
                email: '$authorDetails.email',
            },
            createdAt: 1,
            updatedAt: 1,
        },
    });
    next();
    console.log('prehook');
});
exports.blogModel = (0, mongoose_1.model)('Blog', blogSchema);
