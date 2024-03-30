import mongoose, {Schema} from 'mongoose';

const UserModel = new mongoose.Schema(
  {
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    pic: {
      type: 'string',
      required: true,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', UserModel);
