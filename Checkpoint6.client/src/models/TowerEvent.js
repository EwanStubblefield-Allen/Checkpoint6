import { Account } from "./Account.js"

export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.creator = new Account(data.creator)
    this.ticketCount = data.ticketCount
    this.remainingTickets = this.computedTickets
  }

  get computedTickets() {
    return this.capacity - this.ticketCount
  }
}