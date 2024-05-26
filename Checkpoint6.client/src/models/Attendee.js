export class Attendee {
  constructor(data) {
    this.id = data?.id
    this.accountId = data?.accountId
    this.eventId = data?.eventId
    this.profile = data?.profile
    this.event = data?.event
  }
}
