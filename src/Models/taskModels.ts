import mongoose from "mongoose";
import User from "./userModels";
const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    day: {
      type: Boolean,
      required: true,
    },
    important: {
      type: Boolean,
      required: true,
    },
    planned: {
      type: Boolean,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    all: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

taskSchema.pre("save", async function (next: any): Promise<any> {
  const task: any = this;
  try {
    const user = await User.findOne({ _id: task.user });

    if (user) {
      user.tasks.push(task._id);
      await user.save();
    }
    next();
  } catch (error: any) {
    next(error);
  }
});
const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

export default Task;
