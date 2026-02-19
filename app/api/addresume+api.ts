import { ResumeformInputs } from "@/lib/Database/Schema/ResumeForm";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {

        const { data, userId }: { data: ResumeformInputs, userId: string } = await request.json();

        const resdata = await prisma.resume.create({
            data: {
                name: data.name,
                resumeContent: data.resumeContent,
                userId: userId,
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