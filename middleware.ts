import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    debug: true,
    publicRoutes: ["/"],
    domain: "https://ankidecks.app" as undefined
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};