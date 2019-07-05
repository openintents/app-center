import { Model, getConfig } from 'radiks'

class ModelExt extends Model {
  static fetchOwnPrivateList() {
    const { userSession } = getConfig()
    const models = new Set()
    const modelName = this.modelName()
    return userSession
      .listFiles(name => {
        if (name.startsWith(modelName)) {
          models.add(name.substring(modelName.length + 1))
        }
        return true
      })
      .then(() => {
        console.log(models)
        return models
      })
  }

  savePrivately() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.beforeSave) {
          await this.beforeSave()
        }
        const now = new Date().getTime()
        this.attrs.createdAt = this.attrs.createdAt || now
        this.attrs.updatedAt = now
        await this.sign()
        const encrypted = await this.encrypted()
        await this.saveFile(encrypted)
        resolve(this)
      } catch (error) {
        reject(error)
      }
    })
  }
}
export class UserComment extends ModelExt {
  static className = 'UserComment'
  static schema = {
    object: {
      type: String,
      decrypted: true,
    },
    rating: {
      type: Number,
      decrypted: true,
    },
    comment: {
      type: String,
      decrypted: true,
    },
    createdBy: {
      type: String,
      decrypted: true,
    },
  }
}

export class OwnerComment extends ModelExt {
  static className = 'OwnerComment'
  static schema = {
    object: {
      type: String,
      decrypted: true,
    },
    comment: {
      type: String,
      decrypted: true,
    },
    createdBy: {
      type: String,
      decrypted: true,
    },
    verified: {
      type: Boolean,
      decrypted: true,
    },
  }
  static defaults = {
    verified: false,
  }
}

export class PrivateUserComment extends ModelExt {
  static className = 'PrivateUserComment'
  static schema = {
    object: String,
    rating: Number,
    comment: String,    
    publicRef: String,
  }
}

export class DraftOwnerComment extends ModelExt {
  static className = 'PrivateOwnerComment'
  static schema = {
    object: String,
    comment: String,
    publicRef: String,
  }
}

export const saveUserComment = async (commentText, rating, currentComment) => {
  let updatedComment
  if (currentComment.modelName() === PrivateUserComment.modelName()) {
    updatedComment = new UserComment({
      object: currentComment.attrs.object,
      rating,
      comment: commentText,
    })
    await currentComment.destroy()
  } else {
    currentComment.update({
      rating,
      comment: commentText,
    })
    updatedComment = currentComment
  }

  await updatedComment.save()
}

export const savePrivateUserComment = async (
  commentText,
  rating,
  currentComment
) => {
  let updatedComment
  if (currentComment.modelName() === UserComment.modelName()) {
    updatedComment = new PrivateUserComment({
      object: currentComment.attrs.object,
      rating,
      comment: commentText,
    })
    await currentComment.destroy()
  } else {
    currentComment.update({
      rating,
      comment: commentText,
    })
    updatedComment = currentComment
  }

  await updatedComment.save()
}

export const saveOwnerComment = async (commentText, currentComment) => {
  let updatedComment
  if (currentComment.modelName() === DraftOwnerComment.modelName()) {
    updatedComment = new OwnerComment({
      object: currentComment.attrs.object,
      comment: commentText,
    })
    await currentComment.destroy()
  } else {
    currentComment.update({
      comment: commentText,
    })
    updatedComment = currentComment
  }

  await updatedComment.save()
}

export const saveDraftOwnerComment = async (commentText, currentComment) => {
  let updatedComment
  if (currentComment.modelName() === OwnerComment.modelName()) {
    updatedComment = new DraftOwnerComment({
      object: currentComment.attrs.object,
      comment: commentText,
    })
    await currentComment.destroy()
  } else {
    currentComment.update({
      comment: commentText,
    })
    updatedComment = currentComment
  }

  await updatedComment.save()
}
