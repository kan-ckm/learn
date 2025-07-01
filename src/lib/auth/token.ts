import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


export function generateAccessToken(userId: string, email: string) {
    try {
        if (!ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET is not defined');
        return jwt.sign({ userId, email }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to generate access token');
    }
}


export function generateRefreshToken(userId: string, email: string) {
    try {
        if (!REFRESH_TOKEN_SECRET) throw new Error('REFRESH_TOKEN_SECRET is not defined');
        return jwt.sign({ userId, email }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to generate refresh token');
    }
}

export function verifyAccesstoken(token: string) {
    try {
        if (!ACCESS_TOKEN_SECRET) throw new Error('ACCESS_TOKEN_SECRET is not defined');
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to verify access token');
    }
}
export function verifyRefreshToken(token: string) {
    try {
        if (!REFRESH_TOKEN_SECRET) throw new Error('REFRESH_TOKEN_SECRET is not defined');
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to verify refresh token');
    }
}