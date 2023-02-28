import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

import { env } from './env/server.mjs';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: env.NEXTAUTH_SECRET,
    });

    if (!token) {
        console.log('redirecting')
        return NextResponse.redirect(new URL('/login', request.url))
    }


    if (request.nextUrl.pathname.startsWith('/accounts')) {
        if (token.isAdmin) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/home', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/((?!api|_next/static|_next/image|img|login|register|favicon.ico).*)"
}