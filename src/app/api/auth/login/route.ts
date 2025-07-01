import { db } from "@/db";
import { refreshTokens, users } from "@/db/schema";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth/token";
import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        const [user] = await db.select().from(users).where(eq(users.email, email))
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            return NextResponse.json({
                error: 'User not found',
                status: 401
            })
        }
        if (!isPasswordValid) {
            return NextResponse.json({
                error: 'Wrong password'
            })
        }
        const accessToken = generateAccessToken(user.id, user.email)
        const refreshToken = generateRefreshToken(user.id, user.email)
        await db.insert(refreshTokens).values({
            userId: user.id,
            token: refreshToken
        })
        const tokens = await db
            .select()
            .from(refreshTokens)
            .where(eq(refreshTokens.userId, user.id));

        if (tokens.length <= 5) return;

        // Sắp xếp theo thời gian tạo (cũ nhất trước)
        const sortedTokens = tokens.sort(
            (a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()
        );

        const tokensToDelete = sortedTokens.slice(0, tokens.length - 5);

        for (const token of tokensToDelete) {
            await db.delete(refreshTokens).where(eq(refreshTokens.id, token.id));
        }
        const res = NextResponse.json({ message: 'Login successfully' }, { status: 200 })
        res.cookies.set('accessToken', accessToken, { httpOnly: true, path: '/' })
        res.cookies.set('refreshToken', refreshToken, { httpOnly: true, path: '/' })
        return res
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'failed to generate access token' }, { status: 500 });
    }
}
