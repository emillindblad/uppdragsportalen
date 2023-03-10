import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

import { env } from './env/server.mjs';

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        //'/((?!api/*|_next/static/*|_next/image|img|favicon.ico).*)',
        //Protected paths:
        '/home','/login','/accounts','/uppdrag/:path*','/register','/user','/api:path*', '/chalmers', '/archive', '/review'
    ],
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: env.NEXTAUTH_SECRET,
    });

    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
        if (token) {
            return NextResponse.redirect(new URL('/home', request.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/accounts')) {
        if (token.isAdmin) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/home', request.url))
    }

    if (request.nextUrl.pathname.startsWith('/home')) {
        if (token.isAdmin) {
            return NextResponse.redirect(new URL('/review', request.url))

        }
        return NextResponse.next()
    }

}

