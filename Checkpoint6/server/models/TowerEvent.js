import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverImg: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  isCanceled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['expo', 'convention', 'exhibit', 'sport', 'digital', 'concert'],
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  count: true,
  ref: 'Ticket'
})