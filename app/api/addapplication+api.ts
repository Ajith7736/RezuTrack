import { ApplicationInputs } from "@/lib/Database/Schema/ApplicationForm";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
    try {
        const { userId, data }: { userId: string, data: ApplicationInputs } = await req.json();

        if (!userId || !data) {
            return Response.json({ success: false, message: "Didn't recieve data" }, { headers: { "Content-Type": "application/json" }, status: 400 })
        }

        const resdata = await prisma.$transaction(async (tx) => {

            const usage = await tx.usage.findUnique({
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
                    return { message: "Free Limit Exceeded", success: false }
                }
            }

            await tx.application.create({
                data: {
                    companyName: data.companyName,
                    Date: data.date || "",
                    Link: data.link || "",
                    resumeId: data.resumeId,
                    resumeUsed: data.resumeUsed,
                    roleTitle: data.roleTitle,
                    Status: data.status,
                    userId
                }
            })

            await tx.usage.update({
                where: {
                    userId
                },
                data: {
                    current_Applications: {
                        increment: 1
                    }
                }
            })

            return { success: true }
        })



        if (!resdata.success) {

            if (resdata.message === "Free Limit Exceeded") {
                return Response.json(resdata, { status: 400 })
            }

            return Response.json({ success: false, message: "Couldn't create application" }, { headers: { "Content-Type": "application/json" }, status: 400 })
        }

        return Response.json({ success: true, message: "Success" }, { headers: { "Content-Type": "application/json" }, status: 200 })

    } catch (err) {
        console.error("[API.AddApplication]", err);
        return Response.json({ success: false, message: "Server Error" }, { headers: { "Content-Type": "application/json" }, status: 500 })
    }
}