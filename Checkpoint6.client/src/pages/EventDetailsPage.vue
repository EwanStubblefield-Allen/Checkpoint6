<template>
  <div v-if="activeEvent" class="container-fluid">
    <section class="row my-3 px-3">
      <EventDetailsCard />
    </section>
    <section class="row my-3 px-3">
      <div v-if="attendees[0]" class="col-12 p-0">
        <p class="title">See who is attending</p>
        <div class="event-card p-2">
          <img v-for="a in attendees" :key="a.id" :src="a.profile.picture" :alt="a.profile.name" :title="a.profile.name">
        </div>
      </div>
    </section>

    <section class="row justify-content-center my-3 px-3">
      <div class="col-12 col-md-9 p-0">
        <p class="title">What are people saying</p>
        <div class="event-card py-3 px-3 px-md-5">
          <div v-if="activeEvent.isCanceled" class="text-end green">
            Archived conversation
          </div>

          <div v-else-if="account.id">
            <div class="text-end green">
              Join the conversation
            </div>
            <form @submit.prevent="createComment()">
              <div class="pt-2">
                <textarea v-model="editable.body" class="form-control" name="comment" id="comment" maxlength="300" rows="5" placeholder="Tell the people..." required></textarea>
                <label for="#comment"></label>
              </div>
              <div class="text-end">
                <button class="btn bg-btn btn-success text-dark fw-bold mb-3 px-4 py-2" type="submit">post comment</button>
              </div>
            </form>
          </div>

          <div v-else class="text-end green">
            Login to join the conversation
          </div>

          <div v-for="c in comments" :key="c.id" class="my-2">
            <CommentComponent :commentProp="c" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { towerEventsService } from '../services/TowerEventsService.js'
import { attendeesService } from '../services/AttendeesService.js'
import { commentsService } from '../services/CommentsService.js'
import EventDetailsCard from '../components/EventDetailsCard.vue'
import CommentComponent from '../components/CommentComponent.vue'
import Pop from '../utils/Pop.js'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})

    watchEffect(() => {
      getEventById(route.params.eventId)
      getAttendeesByEventId(route.params.eventId)
    })

    onUnmounted(() => {
      towerEventsService.resetData()
    })

    async function getEventById(eventId) {
      try {
        await towerEventsService.getEventById(eventId)
      }
      catch (error) {
        Pop.error(error.message, "[GETTING EVENT BY ID]")
      }
    }

    async function getAttendeesByEventId(eventId) {
      try {
        await attendeesService.getAttendeesByEventId(eventId)
        getCommentsByEventId()
      } catch (error) {
        Pop.error(error.message, '[GETTING ATTENDEES BY EVENT ID]')
      }
    }

    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error.message, '[GETTING COMMENTS BY EVENT ID]')
      }
    }

    return {
      editable,
      activeEvent: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
      comments: computed(() => AppState.comments),

      async createComment() {
        try {
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message, '[CREATING COMMENT]')
        }
      }
    }
  },
  components: { EventDetailsCard, CommentComponent }
}
</script>

<style lang="scss" scoped>
  img {
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
  }

  .title {
    color: #7981A6;
  }
</style>