<template>
  <form @submit.prevent="createEvent()">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 form-group py-2">
        <input v-model="editable.name" type="text" class="form-control" id="name" aria-describedby="name" placeholder="Name" minlength="3" maxlength="30" required>
      </div>
      <div class="col-12 col-md-6 form py-2">
        <select v-model="editable.type" id="type" class="form-select text-uppercase" required>
          <option v-for="o in options" :key="o" class="text-uppercase" :value="o">{{ o }}</option>
        </select>
      </div>
    </div>
    <div class="form-group py-2">
      <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" aria-describedby="coverImg" maxlength="300" placeholder="Image Url..." required>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-4 form-group py-2">
        <input v-model="editable.location" type="text" class="form-control" id="location" aria-describedby="location" placeholder="Location" minlength="3" maxlength="30" required>
      </div>
      <div class="col-12 col-md-3 form-group py-2">
        <input v-model="editable.capacity" type="number" class="form-control" id="capacity" aria-describedby="capacity" min="1" max="1000000" placeholder="Capacity" required>
      </div>
      <div class="col-12 col-md-5 form-group py-2">
        <input v-model="editable.startDate" type="dateTime-local" class="form-control" id="startDate" name="startDate" min="2023-07-26T22:33" required>
      </div>
    </div>
    <div class="form-group py-2 mb-3">
      <textarea v-model="editable.description" class="form-control" placeholder="Description..." id="description" minlength="3" maxlength="1000" rows="6" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { towerEventsService } from '../services/TowerEventsService.js'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { TowerEvent } from '../models/TowerEvent.js'
import Pop from '../utils/Pop.js'

const router = useRouter()
const editable = ref(new TowerEvent())
const options = ['expo', 'convention', 'exhibit', 'sport', 'digital', 'concert']

async function createEvent() {
  try {
    const eventData = await towerEventsService.createEvent(editable.value)
    editable.value = new TowerEvent()
    Modal.getOrCreateInstance('#eventForm').hide()
    router.push({ name: 'EventDetails', params: { eventId: eventData.id } })
  } catch (error) {
    Pop.error(error.message, '[CREATING EVENT]')
  }
}
</script>

<style lang="scss" scoped></style>