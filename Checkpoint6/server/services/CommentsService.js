import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest(`[THE COMMENT DOES NOT EXIST WITH THE ID: ${commentId}]`)
    }
    return comment
  }

  async getCommentsByEventId(eventId) {
    const comment = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
    return comment
  }

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async removeComment(commentId, userId) {
    const foundComment = await this.getCommentById(commentId)
    if (foundComment.creatorId != userId) {
      throw new Forbidden(`[YOU CANNOT DELETE THIS COMMENT]`)
    }
    await foundComment.remove()
    return foundComment
  }
}

export const commentsService = new CommentsService()