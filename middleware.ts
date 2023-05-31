import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Set the paths that require the user to be signed in
const privatePaths = ['/dashboard']

const isPublic = (path: string) => {
    // return publicPaths.find(x =>
    //     path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
    // )

    for (const privatePath of privatePaths) {
        if (path.toLowerCase().includes(privatePath)) {
            return false
        }
    }

    return true
}

export default withClerkMiddleware((request: NextRequest) => {
    if (isPublic(request.nextUrl.pathname)) {
        return NextResponse.next()
    }
    // if the user is not signed in redirect them to the sign-in page.
    const { userId } = getAuth(request)

    if (!userId) {
        // redirect the users to /pages/sign-in/[[...index]].ts

        const signInUrl = new URL('/sign-in', request.url)
        signInUrl.searchParams.set('redirect_url', request.url)
        return NextResponse.redirect(signInUrl)
    }
    return NextResponse.next()
})

export const config = { matcher:  '/((?!_next/image|_next/static|favicon.ico).*)',};