import { Schema } from 'mongoose'

export const CommentSchema = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Account'
    },
    eventId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'TowerEvent'
    },
    body: {
      type: String,
      required: true
    },
    isAttending: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
