import prisma from "@/lib/prisma";


export async function DELETE(req: Request) {
    try {
        const { ResumeId, userId } = await req.json();

        if (!ResumeId || !userId) {
            return Response.json({ success: false, message: "ResumeId or userId is not recieved" }, { status: 400, headers: { "Content-Type": "application/json" } })
        }

        await prisma.resume.delete({
            where: {
                id: ResumeId
            }
        })

        await prisma.usage.update({
            where: {
                userId
            },
            data: {
                current_Resumes: {
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