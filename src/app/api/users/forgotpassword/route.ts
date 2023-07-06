import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    //check if user already exists
    const user = await User.findOne({ email });
    const userId = await user._id;

    //send verification email
    await sendEmail({ email, emailType: "RESET", userId });

    return NextResponse.json({
      message: "successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
