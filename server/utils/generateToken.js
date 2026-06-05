export const generateToken = (user,statusCode,message,res) => {
    const token = user.generateToken();
    res.status(statusCode)
    .cookie("token",token,
    {expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 1000 * 60 * 60 * 24),
    httpOnly:true,secure:true})
    .json(
        {success: true, 
            message,
            token,
            user
        }
    );
}