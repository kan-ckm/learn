// 7. app/api/me/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { users } from '@/db/schema';

import { eq } from 'drizzle-orm';
import { verifyAccesstoken } from '@/lib/auth/token';
import { db } from '@/db';

export async function GET(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) return NextResponse.json({ user: null });

    try {
        const payload = verifyAccesstoken(accessToken) as any;
        const [userResult] = await db
            .select({ id: users.id, email: users.email })
            .from(users)
            .where(eq(users.id, payload.id));


        return NextResponse.json({ userResult });
    } catch {
        return NextResponse.json({ user: null });
    }
}