// import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
//
// // Set the paths that don't require the user to be signed in
// const publicPaths = ['/', '/sign-in*', '/sign-up*', '/images*', '/favicon.ico', '/api/*', '/*.png', '/*.ico', '/*.svg', '/*.mp4', '/*.webmanifest']
// const privatePaths = ['/dashboard']

// import { authMiddleware } from "@clerk/nextjs";
//
// export default authMiddleware();
//

import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withClerkMiddleware((_req: NextRequest) => {
    return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
    matcher: [
        "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico|/api/keep-alive).*)",
    ],
};