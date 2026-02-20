import { ApplicationInputs } from "@/lib/Database/Schema/ApplicationForm";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
    try {
        const { userId, data }: { userId: string, data: ApplicationInputs } = await req.json();

        if (!userId || !data) {
            return Response.json({ success: false, message: "Didn't recieve data" }, { headers: { "Content-Type": "application/json" }, status: 400 })
        }

        const usage = await prisma.usage.findUnique({
            where: {
                userId
            },
            select: {
                current_Applications: true,
                total_Applications: true
            }
        })


        if (usage?.total_Applications) {
            if (usage?.current_Applications! >= usage?.total_Applications!) {
                return Response.json({ message: "Free Limit Exceeded", success: false }, { status: 200 })
            }
        }



        const application = await prisma.application.create({
            data: {
                companyName: data.companyName,
                Date: data.date || "",
                jobDescription: data.jobDescription || "",
                Link: data.link || "",
                resumeId: data.resumeId,
                resumeUsed: data.resumeUsed,
                roleTitle: data.roleTitle,
                Status: data.status,
                userId
            }
        })

        await prisma.usage.update({
            where: {
                userId
            },
            data: {
                current_Applications: {
                    increment: 1
                }
            }
        })

        if (!application) {
            return Response.json({ success: false, message: "Couldn't create application" }, { headers: { "Content-Type": "application/json" }, status: 400 })
        }

        return Response.json({ success: true, message: "Success" }, { headers: { "Content-Type": "application/json" }, status: 200 })

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { headers: { "Content-Type": "application/json" }, status: 500 })
    }
}