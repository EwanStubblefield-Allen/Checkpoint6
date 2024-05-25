<template>
  <div class="col-12">
    <div class="img-bg">
      <div class="row text-bg py-2">
        <div class="col-12 d-flex justify-content-end dropdown  py-2 py-md-0">
          <div v-if="activeEvent.creatorId == account.id && !activeEvent.isCanceled" type="button" class="selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="d-flex justify-content-center align-items-center mdi mdi-dots-horizontal info fs-3"></i>
          </div>

          <div v-else class="info"></div>

          <div class="dropdown-menu dropdown-menu-end p-0" aria-labelledby="authDropdown">
            <div class="list-group text-center">
              <div @click="isEditing()" class="list-group-item dropdown-item list-group-item-action selectable" data-bs-toggle="modal" data-bs-target="#editForm">
                <p>edit event</p>
              </div>

              <div @click="cancelEvent()" class="list-group-item dropdown-item list-group-item-action text-danger selectable">
                <p>cancel event</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <img class="img-fluid" :src="activeEvent.coverImg" :alt="activeEvent.name">
        </div>

        <div class="col-12 col-md-8 pt-2 d-flex flex-column justify-content-between">
          <div>
            <div class="d-md-flex justify-content-between">
              <p class="fw-bold fs-5">{{ activeEvent.name }}</p>
              <p class="sub-text fs-5">{{ activeEvent.startDate.toLocaleDateString() }}</p>
            </div>

            <div class="d-flex flex-column-reverse flex-md-row justify-content-between sub-text py-2">
              <p class="sub-text">{{ activeEvent.location }}</p>
              <p class="sub-text">starting at {{ activeEvent.startDate.toLocaleTimeString() }}</p>
            </div>

            <div class="pe-3 pb-2 text-break">
              <p>{{ activeEvent.description }}</p>
            </div>
          </div>

          <div v-if="!activeEvent.isCanceled" class="d-flex justify-content-between align-items-center pe-3">
            <p>
              <span v-if="activeEvent.remainingTickets > 0" class="remaining fw-bold fs-5">
                {{ activeEvent.remainingTickets }}
              </span>
              <span v-else class="ticket-count fw-bold fs-5">
                0
              </span>
              spots left
            </p>

            <button @click="removeAttendee()" v-if="isAttending" type="button" class="no-btn btn btn-danger py-2 px-4">
              Not going
              <i class="mdi mdi-human ps-2"></i>
            </button>
            <button v-else-if="!activeEvent.remainingTickets" type="button" class="no-btn btn btn-danger py-2 px-4">
              No spots left
              <i class="mdi mdi-human ps-2"></i>
            </button>
            <button @click="login" v-else-if="!account.id" type="button" class="no-btn btn btn-danger py-2 px-4">
              Login to attend
              <i class="mdi mdi-human ps-2"></i>
            </button>
            <button @click="createAttendee()" v-else type="button" class="attend-btn btn btn-warning py-2 px-4">
              Attend
              <i class="mdi mdi-human ps-2"></i>
            </button>
          </div>

          <div v-else class="no-btn text-dark text-center py-1">
            <p>Event is canceled</p>
          </div>
        </div>

        <div class="info"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js'
import { computed } from 'vue'
import { AuthService } from '../services/AuthService.js'
import { attendeesService } from '../services/AttendeesService.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    return {
      activeEvent: computed(() => AppState.activeEvent),
      backgroundImg: computed(() => `url(${AppState.activeEvent?.coverImg})`),
      account: computed(() => AppState.account),
      isAttending: computed(() => AppState.myAttendings.find(a => a.eventId == AppState.activeEvent.id)),

      async login() {
        AuthService.loginWithPopup()
      },

      async cancelEvent() {
        try {
          const isSure = await Pop.confirm(`Are you sure you want to cancel ${this.activeEvent.name}?`)

          if (!isSure) {
            return
          }
          await towerEventsService.cancelEvent()
        } catch (error) {
          Pop.error(error.message, '[CANCELING EVENT]')
        }
      },

      async createAttendee() {
        try {
          await attendeesService.createAttendee()
        } catch (error) {
          Pop.error(error.message, '[CREATING ATTENDEE]')
        }
      },

      async removeAttendee() {
        try {
          await attendeesService.removeAttendee(this.isAttending.id)
        } catch (error) {
          Pop.error(error.message, '[DELETING ATTENDEE]')
        }
      },

      isEditing() {
        AppState.isEditing = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 100%;
  object-position: center;
  object-fit: cover;
}

.img-bg {
  border-radius: 3px;
  background: v-bind(backgroundImg), lightgray 50% / cover no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.text-bg {
  border-radius: 3px;
  border: 1px solid #ccf3fd33;
  background: #246d8e99;
  backdrop-filter: blur(15px);
  text-shadow: 0px 0px 4px #00000080;
}

.info {
  height: 1rem;
}

.ticket-count {
  color: #FF5977
}

.attend-btn {
  border-radius: 3px;
  background: #FFD464;
}
</style>