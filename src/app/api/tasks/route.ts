import { Connect } from "@/dbconnect/connect";
import User from "@/Models/userModels";
import Task from "@/Models/taskModels";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

Connect();

export async function GET(request: NextRequest): Promise<any> {
  try {
    const req = {
      headers: Object.fromEntries(request.headers.entries()),
    };

    const session: any = await getSession({ req });
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = await User.findOne({ email: session.user?.email });
    const tasks = await Task.find({ user: userId?._id });

    return NextResponse.json(
      { message: "Task Found", data: tasks },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
