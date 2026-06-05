export function generateForgotPasswordEmailTemplate(userName, resetLink){
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
        <div style="max-width: 500px; background: #ffffff; margin: auto; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            
            <h2 style="color: #333; text-align: center;">🔐 Reset Your Password</h2>
            
            <p style="color: #555; font-size: 15px;">
                We received a request to reset your password. Click the button below to set a new password.
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" 
                   style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                   Reset Password
                </a>
            </div>

            <p style="color: #777; font-size: 14px;">
                This link will expire in <strong>10 minutes</strong>. If you didn’t request a password reset, please ignore this email.
            </p>

            <hr style="margin: 25px 0;">

            <p style="color: #999; font-size: 12px;">
                If the button above doesn't work, copy and paste the following link into your browser:
            </p>

            <p style="word-break: break-all; color: #555; font-size: 13px;">
                ${resetLink}
            </p>

            <p style="color: #bbb; font-size: 12px; text-align: center; margin-top: 30px;">
                © 2026 Your Company. All rights reserved.
            </p>

        </div>
    </div>
    `;
}

export function generateResetPasswordEmailTemplate(userName){
    return `
    <div style="font-family: Arial, sans-serif; background-color: #eef2f7; padding: 40px 0;">
        <div style="max-width: 500px; background: #ffffff; margin: auto; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            
            <h2 style="color: #2c3e50; text-align: center;">✅ Password Updated Successfully</h2>
            
            <p style="color: #555; font-size: 15px;">
                Hi ${userName || "User"},
            </p>

            <p style="color: #555; font-size: 15px;">
                Your password has been successfully changed. You can now log in using your new password.
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:3000/login" 
                   style="background-color: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                   Login Now
                </a>
            </div>

            <p style="color: #777; font-size: 14px;">
                If you did not perform this action, please contact our support immediately and secure your account.
            </p>

            <hr style="margin: 25px 0;">

            <p style="color: #999; font-size: 12px;">
                🔒 For security reasons, we recommend not sharing your password with anyone.
            </p>

            <p style="color: #bbb; font-size: 12px; text-align: center; margin-top: 30px;">
                © 2026 Your Company. All rights reserved.
            </p>

        </div>
    </div>
    `;
}