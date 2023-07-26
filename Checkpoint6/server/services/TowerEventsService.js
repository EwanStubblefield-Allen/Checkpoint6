import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
  async getEvents() {
    const events = await dbContext.TowerEvents.find().populate('creator ticketCount', 'name picture')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId).populate('creator ticketCount', 'name picture')
    if (!event) {
      throw new BadRequest(`[THE EVENT DOES NOT EXIST WITH THE ID: ${eventId}]`)
    }
    return event
  }

  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator ticketCount', 'name picture')
    return event
  }

  async editEvent(eventData, eventId) {
    const foundEvent = await this.checkInfo(eventId, eventData.creatorId)
    if (foundEvent.isCanceled) {
      throw new BadRequest('[CANCELED EVENTS CANNOT BE EDITED]')
    }
    foundEvent.name = eventData.name
    foundEvent.description = eventData.description
    await foundEvent.save()
    return foundEvent
  }

  async removeEvent(eventId, userId) {
    const foundEvent = await this.checkInfo(eventId, userId)
    foundEvent.isCanceled = true
    await foundEvent.save()
    return foundEvent
  }

  async checkInfo(eventId, userId) {
    const foundEvent = await this.getEventById(eventId)
    if (userId != foundEvent.creatorId) {
      throw new Forbidden(`[YOU CANNOT EDIT THIS EVENT]`)
    }
    return foundEvent
  }
}

export const towerEventsService = new TowerEventsService()