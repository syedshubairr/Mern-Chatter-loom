import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  pic: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true},
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified()) {
    next();
  }
  const salt = await bcryptjs.genSaltSync(13);
  this.password = await bcryptjs.hashSync(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export const User = mongoose.model<UserDocument>('User', UserSchema);
