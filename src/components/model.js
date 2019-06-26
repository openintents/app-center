import { Model, User } from 'radiks';

export class UserComment extends Model {
  static className = 'AppUpdate';
  static schema = { // all fields are encrypted by default
    object: {
        type: String,
        decrypted: true
    },
    comment: String,
  }
};