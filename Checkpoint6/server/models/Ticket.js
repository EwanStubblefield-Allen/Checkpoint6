import { Schema } from "mongoose";

export const TicketSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  eventId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'TowerEvent'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

TicketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })