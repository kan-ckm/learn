import { NextRequest, NextResponse } from 'next/server';
import { verifyAccesstoken } from '@/lib/auth/token';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('accessToken')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url)); // chưa login thì chuyển về login
    }

    try {
        verifyAccesstoken(token);
        return NextResponse.next(); // hợp lệ thì tiếp tục
    } catch {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// chỉ áp dụng middleware cho những route cần bảo vệ
export const config = {
    matcher: ['/customers/:path*', '/admin/:path*'], // hoặc '/api/protected/:path*'
};
