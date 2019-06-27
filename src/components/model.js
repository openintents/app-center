import { Model, User } from 'radiks'

export class UserComment extends Model {
  static className = 'UserComment'
  static schema = {
    object: {
      type: String,
      decrypted: true,
    },
    comment: String,
    createdBy: {
      type: String,
      decrypted: true,
    },
  }
}

export class OwnerComment extends Model {
  static className = 'OwnerComment'
  static schema = {
    object: {
      type: String,
      decrypted: true,
    },
    comment: String,
    createdBy: {
      type: String,
      decrypted: true,
    },
    verified: Boolean,
  }
  static defaults = {
    verified: false,
  }
}
