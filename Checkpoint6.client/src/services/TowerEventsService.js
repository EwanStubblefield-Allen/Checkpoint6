import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { api } from "./AxiosService.js"

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
    AppState.towerEvents.push(new TowerEvent(res.data))
  }

  resetData() {
    AppState.activeEvent = null
    AppState.attendees = []
    AppState.comments = []
  }
}

export const towerEventsService = new TowerEventsService()