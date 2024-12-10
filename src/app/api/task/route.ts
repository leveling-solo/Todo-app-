import { Connect } from "@/dbconnect/connect";
import User from "@/Models/userModels";
import Task from "@/Models/taskModels";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

Connect();
export async function POST(request: NextResponse) {
  try {
    const req = {
      headers: Object.fromEntries(request.headers.entries()),
    };

    const session = await getSession({ req });
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId: any = await User.findOne({ email: session.user?.email });

    const reqBody = await request.json();

    const newTask = new Task({
      text: reqBody.text,
      day: reqBody.day,
      important: reqBody.important,
      planned: reqBody.planned,
      completed: reqBody.completed,
      all: reqBody.all,
      task: reqBody.task,
      user: userId._id,
    });

    await newTask.save();
    return NextResponse.json(
      {
        message: "Task is Created Successfully",
        sucess: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
}
