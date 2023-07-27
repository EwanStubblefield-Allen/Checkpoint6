<template>
  <div class="container-fluid">
    <section class="row my-3 px-3">
      <p class="green fs-5">My Events</p>
    </section>

    <section class="row">
      <div v-for="e in  towerEvents " :key="e.id" class="col-12 col-md-3 py-2 px-3">
        <router-link :to="{ name: 'EventDetails', params: { eventId: e.id } }">
          <TowerEventCard :eventProp="e" />
        </router-link>
      </div>
    </section>

    <section v-if="myAttendings[0]" class="row mt-5 mb-3 px-3">
      <p class="green fs-5">Upcoming Events</p>
    </section>

    <section v-if="myAttendings[0]" class="row justify-content-center p-3">
      <div v-for="a in myAttendings" :key="a.id" class="col-12 col-md-8 py-2">
        <MyAttendingsCard :attendingProp="a" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { towerEventsService } from '../services/TowerEventsService.js'
import { attendeesService } from '../services/AttendeesService.js'
import Pop from '../utils/Pop.js'
import MyAttendingsCard from '../components/MyAttendingsCard.vue'

export default {
  setup() {
    onMounted(() => {
      getEvents()
      getMyAttendings()
    })

    async function getEvents() {
      try {
        await towerEventsService.getEvents()
      }
      catch (error) {
        Pop.error(error.message, '[GETTING EVENTS]')
      }
    }

    async function getMyAttendings() {
      try {
        await attendeesService.getMyAttendings()
      } catch (error) {
        Pop.error(error.message, '[GETTING MY ATTENDINGS]')
      }
    }

    return {
      towerEvents: computed(() => AppState.towerEvents.filter(e => e.creatorId == AppState.account.id)),
      myAttendings: computed(() => AppState.myAttendings)
    }
  },
  components: { MyAttendingsCard }
}
</script>

<style scoped>
  img {
    max-width: 100px;
  }
</style>