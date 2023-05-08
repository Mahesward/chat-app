import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      default: 'https://picsum.photos/200/300',
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
