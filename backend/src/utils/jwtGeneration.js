import jwt from 'jsonwebtoken';

const generateAccessToken = function (user,role) {
    console.log("generate access token role ::: "+role)
    return jwt.sign(
        {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

const generateRefreshToken = function (user, role) {
    console.log("generate refresh token role ::: "+role)
    return jwt.sign(
        {
            _id: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export {generateAccessToken, generateRefreshToken};