<template>
  <div v-if="activeEvent" class="container-fluid">
    <section class="row my-3 px-3">
      <EventDetailsCard />
    </section>
    <section class="row my-3 px-3">
      <div v-if="attendees[0]" class="col-12 p-0">
        <p class="title">See who is attending</p>
        <div class="bg p-2">
          <img v-for="a in attendees" :key="a.id" :src="a.profile.picture" :alt="a.profile.name" :title="a.profile.name">
        </div>
      </div>
    </section>

    <section class="row justify-content-center my-3 px-3">
      <div class="col-12 col-md-9 p-0">
        <p class="title">What are people saying</p>
        <div class="bg py-3 px-3 px-md-5">
          <div v-if="account.id">
            <div class="text-end green">
              Join the conversation
            </div>
            <form @submit.prevent="">
              <div class="pt-2">
                <textarea class="form-control" name="comment" id="comment" rows="5" placeholder="Tell the people..."></textarea>
                <label for="#comment"></label>
              </div>
              <div class="text-end">
                <button class="btn btn-success text-dark fw-bold mb-3 px-4 py-2" type="submit">post comment</button>
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
  import { computed, onMounted, onUnmounted } from 'vue'
  import { towerEventsService } from '../services/TowerEventsService.js'
  import { attendeesService } from '../services/AttendeesService.js'
  import { commentsService } from '../services/CommentsService.js'
  import EventDetailsCard from '../components/EventDetailsCard.vue'
  import CommentComponent from '../components/CommentComponent.vue'
  import Pop from '../utils/Pop.js'

  export default {
    setup() {
      const route = useRoute()

      onMounted(() => {
        getEventById()
        getAttendeesByEventId()
        getCommentsByEventId()
      })

      onUnmounted(() => {
        towerEventsService.resetData()
      })

      async function getEventById() {
        try {
          await towerEventsService.getEventById(route.params.eventId);
        }
        catch (error) {
          Pop.error(error.message, "[GETTING EVENT BY ID]");
        }
      }

      async function getAttendeesByEventId() {
        try {
          await attendeesService.getAttendeesByEventId(route.params.eventId)
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
        activeEvent: computed(() => AppState.activeEvent),
        account: computed(() => AppState.account),
        attendees: computed(() => AppState.attendees),
        comments: computed(() => AppState.comments)
      };
    },
    components: { EventDetailsCard, CommentComponent }
  }
</script>

<style lang="scss" scoped>
  img {
    height: 5vh;
    widows: 5vh;
    border-radius: 50%;
  }

  button {
    border-radius: 3px;
    background: var(--t-2-success, #79E7AB);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .title {
    color: #7981A6;
  }

  .bg {
    border-radius: 3px;
    background: #474C61;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>