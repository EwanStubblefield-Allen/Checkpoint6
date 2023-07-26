import { Account } from "./Account.js"

export class Attendee {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.profile = new Account(data.profile)
  }
}