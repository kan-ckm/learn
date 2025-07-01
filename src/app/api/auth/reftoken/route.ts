import { db } from "@/db";
import { refreshTokens, users } from "@/db/schema";
import { generateAccessToken, verifyAccesstoken, verifyRefreshToken } from "@/lib/auth/token";

import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('refreshToken')?.value
        if (!token) {
            return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 })
        }


        let payload;
        try {
            payload = verifyRefreshToken(token)
        } catch (error) {
            console.error(error);
            return NextResponse.json({ error: 'failed to generate access token' }, { status: 500 });
        }
        const [tokenInDb] = await db.select().from(refreshTokens).where(eq(refreshTokens.token, token))
        if (!tokenInDb || tokenInDb.revoked) {
            return NextResponse.json({ error: 'Token revoked' }, { status: 401 })
        }
        if (typeof payload === 'string') {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }
        const [user] = await db.select().from(users).where(eq(users.id, payload.id))
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 })
        }
        const newAccessToken = generateAccessToken(user.id, user.email)
        const res = NextResponse.json({})
        res.cookies.set('accessToken', newAccessToken, { httpOnly: true, path: '/' })
        return res
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'failed to generate access token' }, { status: 500 });
    }
}
