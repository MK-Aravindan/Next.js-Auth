import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();

    const { email, password } = user;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(
        JSON.stringify({ error: "User does not exist" }),
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    existingUser.password = hashedPassword;
    await existingUser.save();

    return new NextResponse(
      JSON.stringify({
        message: "Password updated successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
