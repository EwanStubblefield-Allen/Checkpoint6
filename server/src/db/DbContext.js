import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TowerEventSchema } from '../models/TowerEvent.js'
import { TicketSchema } from '../models/Ticket.js'
import { CommentSchema } from '../models/Comment.js'

class DbContext {
  Account = mongoose.model('Account', AccountSchema)
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)
  Tickets = mongoose.model('Ticket', TicketSchema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
