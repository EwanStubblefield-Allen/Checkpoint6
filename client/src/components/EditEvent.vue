<template>
  <form @submit.prevent="editEvent()">
    <div class="form-group py-2">
      <input v-model="editable.name" type="text" class="form-control" id="name" aria-describedby="name" placeholder="Name" minlength="3" maxlength="30" required>
    </div>
    <div class="form-group py-2 mb-3">
      <textarea v-model="editable.description" class="form-control" placeholder="Description..." id="description" minlength="3" maxlength="1000" rows="6" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script setup>
import { AppState } from '../AppState.js'
import { ref, watchEffect } from 'vue'
import { towerEventsService } from '../services/TowerEventsService.js'
import { Modal } from 'bootstrap'
import { TowerEvent } from '../models/TowerEvent.js'
import Pop from '../utils/Pop.js'

const editable = ref(new TowerEvent())

watchEffect(() => {
  if (AppState.activeEvent) {
    editable.value = { ...AppState.activeEvent }
  }
})

async function editEvent() {
  try {
    await towerEventsService.editEvent(editable.value)
    Modal.getOrCreateInstance('#editForm').hide()
  } catch (error) {
    Pop.error(error.message, '[EDITING EVENT]')
  }
}
</script>

<style lang="scss" scoped></style>