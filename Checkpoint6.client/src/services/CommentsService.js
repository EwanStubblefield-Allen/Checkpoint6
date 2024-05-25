import { AppState } from '../AppState.js'
import { Comment } from '../models/Comment.js'
import { api } from './AxiosService.js'

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(d => new Comment(this.checkAttendance(d)))
  }

  async createComment(commentData) {
    commentData.eventId = AppState.activeEvent.id
    const res = await api.post('api/comments', commentData)
    this.checkAttendance(res.data)
    AppState.comments.push(new Comment(res.data))
  }

  async removeComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }

  removeAllCommentAttendance() {
    AppState.comments.map(c => (c.isAttending = false))
  }

  checkAttendance(commentData) {
    const foundAttendee = AppState.attendees.find(a => a.accountId == commentData.creatorId)

    if (foundAttendee) {
      commentData.isAttending = true
    }
    return commentData
  }

  changeAttendeeCommentStatus() {
    AppState.comments.map(c => {
      if (c.creatorId == AppState.account.id) {
        c.isAttending = !c.isAttending
      }
    })
  }
}

export const commentsService = new CommentsService()
