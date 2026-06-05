import nodemailer from "nodemailer";
import ErrorHandler from "../middlewares/error.js";

export const sendEmail = async ({to,subject,message}) => {
    try{const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        service: process.env.SMTP_SERVICE,
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: message,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
}catch(error){
    throw new Error(error.message || "Failed to send email");
}
    
};