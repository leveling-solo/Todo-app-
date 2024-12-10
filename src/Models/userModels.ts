import mongoose, { Model } from "mongoose";
interface User extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
}
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    image: { type: String },

    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
  },
  { timestamps: true }
);
const User: Model<User> =
  mongoose.models.users || mongoose.model("users", userSchema);

export default User;
