import nodemailer, { Transporter } from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "95c965b4dc395c",
        pass: "d4c87feab4fc4a"
      }
    });

    const mailOptions = {
      from: "aravindanmk@gmail.com",
      to: email,
      subject: "",
      html: ""
    };
    
    if (emailType === "VERIFY") {
      mailOptions.subject = "Verify your email";
      mailOptions.html = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`;
    } else if (emailType === "RESET") {
      mailOptions.subject = "Reset your password";
      mailOptions.html = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`;
    }
    

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
