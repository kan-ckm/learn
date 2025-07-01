import { db } from "@/db";
import { refreshTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value
    if (refreshToken) {
        await db.update(refreshTokens).set({ revoked: true }).where(eq(refreshTokens.token, refreshToken))
    }
    const res = NextResponse.json({ message: 'Logged out successfully' })
    res.cookies.delete('accessToken')
    res.cookies.delete('refreshToken')
    return res
}