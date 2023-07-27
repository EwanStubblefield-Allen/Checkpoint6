<template>
  <div class="container-fluid">
    <section class="row mb-3 px-3">
      <div class="col-12 my-3 px-0">
        <img src="../assets/img/seats.png" alt="">
      </div>

      <div class="col-12 d-flex overflow-auto filter p-0">
        <p @click="filter = ''" class="filter-btn selectable text-center p-3" :class="{ selected: filter == '' }">All</p>
        <p @click="filter = 'expo'" class="filter-btn selectable text-center p-3" :class="{ selected: filter == 'expo' }">Expos</p>
        <p @click="filter = 'convention'" class="filter-btn selectable text-center p-3" :class="{ selected: filter == 'convention' }">Conventions</p>
        <p @click="filter = 'exhibit'" class="filter-btn selectable text-center p-3" :class="{ selected: filter == 'exhibit' }">Exhibits</p>
        <p @click="filter = 'sport'" class="filter-btn selectable text-center p-3" :class="{ selected: filter == 'sport' }">Sports</p>
        <p @click="filter = 'digital'" class="filter-btn selectable text-center p-3" :class="{ selected: filter == 'digital' }">Digital</p>
        <p @click="filter = 'concert'" class="filter-btn selectable text-center p-3" :class="{ selected: filter == 'concert' }">Concerts</p>
      </div>
    </section>

    <section class="row">
      <div v-for="e in  towerEvents " :key="e.id" class="col-12 col-md-3 py-2 px-3">
        <router-link :to="{ name: 'EventDetails', params: { eventId: e.id } }">
          <TowerEventCard :eventProp="e" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import TowerEventCard from '../components/TowerEventCard.vue'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const filter = ref("")

    onMounted(() => {
      getEvents()
    })

    async function getEvents() {
      try {
        await towerEventsService.getEvents()
      } catch (error) {
        Pop.error(error.message, '[GETTING EVENTS]')
      }
    }

    return {
      filter,
      towerEvents: computed(() => {
        if (filter.value) {
          return AppState.towerEvents.filter(t => t.type == filter.value)
        }
        return AppState.towerEvents
      })
    }
  },
  components: { TowerEventCard }
}
</script>

<style scoped lang="scss">
  img {
    width: 100%;
    height: 30vh;
    object-fit: cover;
    object-position: top;
  }

  .filter {
    border-radius: 3px;
    background: var(--t-2-dark-lighten, #474C61);
    box-shadow: 0px 4px 4px 0px #00000040;
  }

  .filter-btn {
    height: 100%;
    width: 100%;
  }

  .selected {
    color: var(--bs-success);
    border-bottom: 4px solid var(--bs-success);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>