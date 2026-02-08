import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

        const resumes = await prisma.resume.findMany({
            where: {
                userId
            },
            select: {
                applications: {
                    where: {
                        Status: 'Offer'
                    },
                    select: {
                        resumeUsed: true
                    }
                }
            }
        })

        console.log(JSON.stringify(resumes, null, 2));





        return Response.json({ success: true })

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}