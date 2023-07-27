<template>
  <div class="d-flex">
    <img class="me-2" :src="commentProp.creator.picture" :alt="commentProp.creator.name">
    <div class="comment-bg py-1 px-2">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <p class="fw-bold">{{ commentProp.creator.name }}</p>
          <p v-if="commentProp.isAttending" class="attending ps-3">Attending this event</p>
        </div>

        <i @click="removeComment()" v-if="commentProp.creatorId == account.id" class="mdi mdi-trash-can text-danger selectable fs-5" title="Delete Comment"></i>
      </div>
      <p>{{ commentProp.body }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Comment } from '../models/Comment.js'
import { AppState } from '../AppState.js'
import { commentsService } from '../services/CommentsService.js'
import Pop from '../utils/Pop.js'

export default {
  props: {
    commentProp: {
      type: Comment,
      required: true
    }
  },

  setup(props) {
    return {
      account: computed(() => AppState.account),

      async removeComment() {
        try {
          const isSure = await Pop.confirm('Are you sure you want to delete this comment?')

          if (!isSure) {
            return
          }
          await commentsService.removeComment(props.commentProp.id)
        } catch (error) {
          Pop.error(error.message, '[DELETING COMMENT]')
        }
      }
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