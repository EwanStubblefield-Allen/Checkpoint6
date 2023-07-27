import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  async getTicketById(ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('profile', 'name picture').populate('event')
    if (!ticket) {
      throw new BadRequest(`[THE TICKET DOES NOT EXIST WITH THE ID: ${ticketId}]`)
    }
    return ticket
  }

  async getMyTickets(userId) {
    const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('profile', 'name picture').populate('event')
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture')
    return tickets
  }

  async createTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    return ticket
  }

  async removeTicket(ticketId, userId) {
    const foundTicket = await this.getTicketById(ticketId)
    if (foundTicket.accountId != userId) {
      throw new Forbidden(`[YOU CANNOT DELETE THIS TICKET]`)
    }
    await foundTicket.remove()
    return foundTicket
  }

  async removeTicketsByEventId(eventId) {
    const foundTickets = await this.getTicketsByEventId(eventId)
    foundTickets.forEach(async t => await t.remove())
  }
}

export const ticketsService = new TicketsService()