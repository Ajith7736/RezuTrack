import { ResumeformInputs } from "@/lib/Database/Schema/ResumeForm";
import prisma from "@/lib/prisma";


export async function POST(request: Request) {
    try {

        const { data, userId }: { data: ResumeformInputs, userId: string } = await request.json();

        const Usage = await prisma.usage.findUnique({
            where: {
                userId
            },
            select: {
                current_Resumes: true,
                total_resume: true
            }
        })

        if (Usage?.current_Resumes! >= Usage?.total_resume!) {
            return Response.json({ message: "Free Limit Exceeded", success: false }, { status: 200 })
        }



        const resdata = await prisma.resume.create({
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

        if (!resdata) {
            return Response.json({ success: false, message: 'Couldnt create Resume' })
        }



        return Response.json({ success: true, message: 'Successfully created' });

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500 })
    }

}