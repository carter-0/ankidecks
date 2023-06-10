import {prisma} from "@/lib/db";
export const getUserTokens = async (userId: string) => {
    let user = await prisma.user.findUnique({
        where: {
            userId: userId
        }
    }) as User

    if (!user) {
        user = await prisma.user.create({
            data: {
                userId: userId,
            }
        }) as User
    }

    return user.tokenAllowance
}