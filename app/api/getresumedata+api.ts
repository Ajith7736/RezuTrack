import prisma from "@/lib/prisma";
import resumes from "../(tabs)/resumes";
import { success } from "zod";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();


        const resumes = await prisma.resume.findMany({
            where: {
                userId,
                applications: {
                    some: {
                        Status: 'Offer'
                    }
                }
            },
            select: {
                applications: {
                    where: {
                        Status: 'Offer',
                    },
                    select: {
                        resumeUsed: true
                    }
                }
            }
        })



        if (!resumes) {
            return Response.json({ success: true, message: 'Empty' }, { status: 200 })
        }

        const data = resumes.map((resume) => {
            return { value: resume.applications.length, label: resume.applications[0].resumeUsed }
        })

        return Response.json({ success: true, resumedata: data })

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}