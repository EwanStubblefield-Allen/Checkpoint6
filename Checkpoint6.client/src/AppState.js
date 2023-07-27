import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent | null} */
  activeEvent: null,
  /** @type {import('./models/Attendee.js').Attendee[]} */
  attendees: [],
  /** @type {import('./models/Attendee.js').Attendee[]} */
  myAttendings: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: []
})