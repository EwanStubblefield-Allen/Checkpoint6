<template>
  <div class="row event-card position-relative">

    <router-link :to="{ name: 'EventDetails', params: { eventId: attendingProp.event.id } }" class="col-12 col-md-4 px-0 pe-md-2">
      <img :src="attendingProp.event.coverImg" :alt="attendingProp.event.name">
    </router-link>
    <div class="col-12 col-md-7 d-flex flex-column justify-content-between p-2">
      <div>
        <p class="fw-bold">{{ attendingProp.event.name }}</p>
        <div class="sub-text py-2">
          <p>{{ attendingProp.event.location }}</p>
          <p>{{ new Date(attendingProp.event.startDate).toLocaleDateString() }}</p>
        </div>
      </div>
      <div class="text-end">
        <button @click="removeAttendee()" type="button" class="no-btn btn btn-danger py-2 px-4">
          Not going
          <i class="mdi mdi-human ps-2"></i>
        </button>
      </div>
    </div>
    <div class="col-1 d-none d-md-flex justify-content-end circle-position"></div>
  </div>
</template>

<script>
import { Attendee } from '../models/Attendee.js'
import { attendeesService } from '../services/AttendeesService.js'
import Pop from '../utils/Pop.js'

export default {
  props: {
    attendingProp: {
      type: Attendee,
      required: true
    }
  },

  setup(props) {
    return {
      async removeAttendee() {
        try {
          await attendeesService.removeAttendee(props.attendingProp.id)
        } catch (error) {
          Pop.error(error.message, '[DELETING ATTENDEE]')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 30vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.circle-position {
  height: 20vh;
  width: 20vh;
  border-radius: 50%;
  position: absolute;
  top: 5vh;
  right: -10vh;
  background: #2A2D3A;
}
</style>