import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { commentsService } from "./CommentsService.js"

class AttendeesService {
  async getMyAttendings() {
    try {
      const res = await api.get('account/tickets')
      AppState.myAttendings = res.data.map(d => new Attendee(d))
    } catch (error) {
      Pop.error(error.message, '[GETTING MY ATTENDINGS]')
    }
  }

  async getAttendeesByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.attendees = res.data.map(d => new Attendee(d))
  }

  async createAttendee() {
    const res = await api.post('api/tickets', { eventId: AppState.activeEvent.id })
    AppState.activeEvent.remainingTickets--
    commentsService.changeAttendeeCommentStatus()
    AppState.attendees.push(new Attendee(res.data))
    AppState.myAttendings.push(new Attendee(res.data))
  }

  async removeAttendee(attendeeId) {
    const res = await api.delete(`api/tickets/${attendeeId}`)

    if (AppState.activeEvent) {
      AppState.activeEvent.remainingTickets++
      commentsService.changeAttendeeCommentStatus()
      AppState.attendees = AppState.attendees.filter(a => a.id != attendeeId)
    }
    const foundEvent = AppState.towerEvents.find(e => e.id == res.data.eventId)

    if (foundEvent) {
      foundEvent.remainingTickets++
    }
    AppState.myAttendings = AppState.myAttendings.filter(a => a.id != attendeeId)
  }

  removeAllAttendees() {
    AppState.attendees = []
    AppState.myAttendings = AppState.myAttendings.filter(a => a.eventId != AppState.activeEvent.id)
  }
}

export const attendeesService = new AttendeesService()