import { Connect } from "@/dbconnect/connect";
import Task from "@/Models/taskModels";
import User from "@/Models/userModels";
import { NextRequest, NextResponse } from "next/server";

Connect();
export async function PATCH(request: NextRequest) {
  try {
    const { completed, important, _id, planned, day, task, all, text } =
      await request.json();
    const result: any = await Task.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          completed: completed,
          important: important,
          planned: planned,
          task: task,
          day: day,
          all: all,
          text: text,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Task is updated Successsfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Faied to update task",
      },
      { status: 505 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { _id, user } = await request.json();

    // Delete teh Task
    await Task.findOneAndDelete({ _id: _id });
    const userId = user;
    await User.findByIdAndUpdate(userId, { $pull: { tasks: _id } });

    return NextResponse.json(
      {
        message: "Task deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Faied to update task",
      },
      { status: 505 }
    );
  }
}
