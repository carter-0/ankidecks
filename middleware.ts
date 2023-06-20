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
// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import {authMiddleware, redirectToSignIn} from '@clerk/nextjs';

export default authMiddleware({
    afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
    }
});