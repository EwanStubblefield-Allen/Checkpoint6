import { AppState } from '../AppState.js'
import { TowerEvent } from '../models/TowerEvent.js'
import { attendeesService } from './AttendeesService.js'
import { api } from './AxiosService.js'
import { commentsService } from './CommentsService.js'

class TowerEventsService {
  async getEvents() {
    const res = await api.get('api/events')
    AppState.towerEvents = res.data.map(d => new TowerEvent(d))
  }

  async getEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    AppState.activeEvent = new TowerEvent(res.data)
  }

  async createEvent(eventData) {
    const res = await api.post('api/events', eventData)
    const newEventData = new TowerEvent(res.data)
    AppState.towerEvents.push(newEventData)
    return newEventData
  }

  async editEvent(eventData) {
    const eventId = AppState.activeEvent.id
    const res = await api.put(`api/events/${eventId}`, eventData)
    AppState.activeEvent = new TowerEvent(res.data)
  }

  async cancelEvent() {
    await api.delete(`api/events/${AppState.activeEvent.id}`)
    AppState.activeEvent.isCanceled = true
    attendeesService.removeAllAttendees()
    commentsService.removeAllCommentAttendance()
  }

  resetData() {
    AppState.activeEvent = null
    AppState.attendees = []
    AppState.comments = []
  }
}

export const towerEventsService = new TowerEventsService()
