import jwt from 'jsonwebtoken';

const generateAccessToken = function (user,role) {
    return jwt.sign(
        {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role:role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

const generateRefreshToken = function (user, role) {
    return jwt.sign(
        {
            _id: user._id,
            role:role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export {generateAccessToken, generateRefreshToken};