<template>
  <header>
    <Navbar />
  </header>

  <main>
    <router-view />
  </main>

  <ModalComponent />
</template>

<script>
  import { computed, onMounted } from 'vue'
  import { AppState } from './AppState'
  import { towerEventsService } from './services/TowerEventsService.js'
  import Navbar from './components/Navbar.vue'
  import ModalComponent from './components/ModalComponent.vue'
  import Pop from './utils/Pop.js'

  export default {
    setup() {
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
        appState: computed(() => AppState)
      }
    },
    components: { Navbar, ModalComponent }
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
</style>
