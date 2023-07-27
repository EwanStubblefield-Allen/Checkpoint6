<template>
  <header>
    <Navbar />
  </header>

  <main>
    <router-view />
  </main>

  <ModalComponent id="eventForm">
    <template #title>
      Create Event
    </template>
    <template #body>
      <CreateEvent />
    </template>
  </ModalComponent>

  <ModalComponent id="editForm">
    <template #title>
      Edit Event
    </template>
    <template #body>
      <EditEvent />
    </template>
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import ModalComponent from './components/ModalComponent.vue'
import CreateEvent from './components/CreateEvent.vue'
import EditEvent from './components/EditEvent.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, CreateEvent, EditEvent }
}
</script>
<style lang="scss">
  @import "./assets/scss/main.scss";

  :root {
    --main-height: calc(100vh - 32px - 64px);
  }

  body {
    background: #2A2D3A;
    color: white;
  }

  p {
    margin: 0;
  }

  .sub-text {
    color: #CCF3FD;
  }

  .remaining {
    color: #56C7FB;
  }

  .green {
    color: var(--bs-success);
  }

  .event-card {
    border-radius: 3px;
    background: #474C61;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .no-btn {
    border-radius: 3px;
    background: #FF5977;
  }

  .bg-btn {
    border-radius: 3px;
    background: var(--t-2-success, #79E7AB);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>