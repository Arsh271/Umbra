import nodemailer from "nodemailer"

export const sendEmail = async(email,otp)=>{

    const transporter= nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    await transporter.sendMail({
        from: `"Umbra" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP for login",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`
    })
}