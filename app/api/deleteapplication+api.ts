import prisma from "@/lib/prisma";


export async function DELETE(req: Request) {
    try {
        const { ApplicationId, userId } = await req.json();

        if (!ApplicationId || !userId) {
            return Response.json({ success: false, message: "ApplicationId or userId is not recieved" }, { status: 400, headers: { "Content-Type": "application/json" } })
        }

        await prisma.application.delete({
            where: {
                id: ApplicationId
            }
        })

        await prisma.usage.update({
            where: {
                userId
            },
            data: {
                current_Applications: {
                    decrement: 1
                }
            }
        })

        return Response.json({ success: true, message: "Successfully deleted" }, { status: 200, headers: { "Content-Type": "application/json" } })

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500, headers: { "Content-Type": "application/json" } })
    }
}