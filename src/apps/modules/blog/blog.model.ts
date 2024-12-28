import { model, Schema } from 'mongoose'
import { IBlog } from './blog.interface'

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

blogSchema.pre('aggregate', function (next) {
  this.pipeline().unshift(
    {
      $lookup: {
        from: 'User',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails',
      },
    },
    {
      $unwind: '$authorDetails',
    },
    {
      $match: { 'authorDetails.isBlocked': false },
    },
    {
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
    },
  )
  next()
  console.log('prehook')
})

export const blogModel = model<IBlog>('Blog', blogSchema)
