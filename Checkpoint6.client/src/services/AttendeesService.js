import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import { api } from "./AxiosService.js"

class AttendeesService {
  async getAttendeesByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.attendees = res.data.map(d => new Attendee(d))
  }

  async createAttendee() {
    const res = await api.post('api/tickets', { eventId: AppState.activeEvent.id })
    AppState.activeEvent.remainingTickets--
    AppState.attendees.push(new Attendee(res.data))
  }
}

export const attendeesService = new AttendeesService()