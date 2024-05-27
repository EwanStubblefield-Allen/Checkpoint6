<template>
  <div class="p-1 event-card card-height">
    <div class="d-flex align-items-end img-bg">
      <div class="d-flex flex-column justify-content-between card-text">
        <div class="p-2">
          <p class="text-light fw-bold">{{ eventProp.name }}</p>
          <p class="sub-text">{{ eventProp.location }}</p>
          <p class="sub-text">{{ eventProp.startDate.toLocaleDateString() }}</p>
        </div>
        <div v-if="eventProp.isCanceled" class="text-center text-dark no-ticket">
          <p>Canceled</p>
        </div>
        <div v-else-if="eventProp.remainingTickets > 0" class="text-end text-light p-2">
          <p>
            <span class="remaining fw-bold">
              {{ eventProp.remainingTickets }}
            </span>
            spots left
          </p>
        </div>
        <div v-else class="text-center text-dark no-ticket">
          <p>At Capacity</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TowerEvent } from '../models/TowerEvent.js'

const props = defineProps({
  eventProp: TowerEvent
})
const backgroundImg = `url(${props.eventProp.coverImg})`
</script>

<style lang="scss" scoped>
.img-bg {
  height: 100%;
  border-radius: 3px;
  background-image: v-bind(backgroundImg);
  background-position: center;
  background-size: cover;
}

.card-text {
  height: fit-content;
  width: 100%;
  border-radius: 3px;
  border: 1px solid rgba(86, 199, 251, 0.20);
  background: rgba(204, 243, 253, 0.20);
  backdrop-filter: blur(10px);
  text-shadow: 0px 0px 4px #00000080;
}

.no-ticket {
  border-radius: 3px;
  background: #FF5977;
}

.card-height {
  height: 40vh;
}
</style>