<template>
  <div class="modal fade" id="eventForm" tabindex="-1" aria-labelledby="eventModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-dark" id="eventForm">
            Create Event
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <CreateEvent />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import CreateEvent from './CreateEvent.vue'

  export default {
    setup() {
      return {};
    },
    components: { CreateEvent }
  }
</script>

<style lang="scss" scoped></style>