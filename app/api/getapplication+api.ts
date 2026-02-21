import prisma from "@/lib/prisma";


export async function POST(request: Request) {
    try {
        const { lastId, userId, Search, Status } = await request.json();

        const data = await prisma.application.findMany({
            where: {
                userId,
                companyName: Search ? { contains: Search, mode: 'insensitive' } : undefined,
                Status: Status ? { equals: Status } : undefined
            },
            take: 10,
            ...(lastId && {
                cursor: {
                    id: lastId
                }, skip: 1
            }),
            orderBy: {
                createdAt: 'desc'
            }
        })


        return Response.json({ success: false, applications: data }, { status: 200 })


    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}