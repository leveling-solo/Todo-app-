import { getSession } from "next-auth/react";
import { Connect } from "../../../dbconnect/connect";
import User from "../../../Models/userModels";
import { NextRequest, NextResponse } from "next/server";

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
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      return new NextResponse("User Not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    return new NextResponse("server Error", { status: 500 });
  }
}
