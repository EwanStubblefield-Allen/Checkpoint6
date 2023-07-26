<template>
  <div class="d-flex">
    <img class="me-2" :src="commentProp.creator.picture" :alt="commentProp.creator.name">
    <div class="comment-bg py-1 px-2">
      <div class="d-flex">
        <p class="fw-bold">{{ commentProp.creator.name }}</p>
        <p v-if="commentProp.isAttending" class="attending ps-3">Attending this event</p>
      </div>
      <p>{{ commentProp.body }}</p>
    </div>
  </div>
</template>

<script>
  import { AppState } from '../AppState.js'
  import { computed, onMounted } from 'vue'
  import { Comment } from '../models/Comment.js'

  export default {
    props: {
      commentProp: {
        type: Comment,
        required: true
      }
    },

    setup() {
      onMounted(() => {

      })

      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  img {
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .comment-bg {
    width: 100%;
    color: black;
    border-radius: 3px;
    background: #E2F9FF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .attending {
    color: #56C7FB;
  }
</style>