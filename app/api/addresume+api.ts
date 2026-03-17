import { ResumeformInputs } from "@/lib/Database/Schema/ResumeForm";
import prisma from "@/lib/prisma";


export async function POST(request: Request) {
    try {

        const { data, userId }: { data: ResumeformInputs, userId: string } = await request.json();

        const resdata = await prisma.$transaction(async (tx) => {
            const Usage = await tx.usage.findUnique({
                where: {
                    userId
                },
                select: {
                    current_Resumes: true,
                    total_resume: true
                }
            })


            if (Usage?.total_resume) {
                if (Usage?.current_Resumes! >= Usage?.total_resume!) {
                    return { message: "Free Limit Exceeded", success: false }
                }
            }


            await prisma.resume.create({
                data: {
                    name: data.name,
                    resumeContent: data.resumeContent,
                    userId: userId,
                }
            })


            await prisma.usage.update({
                where: {
                    userId
                },
                data: {
                    current_Resumes: {
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

            return Response.json({ success: false, message: 'Couldnt create Resume' }, { status: 400 })
        }



        return Response.json({ success: true, message: 'Successfully created' }, { status: 200 });

    } catch (err) {
        console.error("[API.AddResume]", err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500 })
    }

}