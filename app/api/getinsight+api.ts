import z, { success } from "zod";
import { google } from '@ai-sdk/google'
import { generateText, Output } from 'ai'
import prisma from "@/lib/prisma";
import { getprompt } from "@/lib/prompt/PromptText";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

        const schema = z.array(z.object({
            icon: z.string(),
            type: z.enum(["info", "success", "warning", "error"]),
            title: z.string(),
            message: z.string()
        }))

        const data = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                Appications: {
                    select: {
                        companyName: true,
                        Date: true,
                        jobDescription: true,
                        Link: true,
                        Resume: {
                            select: {
                                name: true,
                                resumeContent: true
                            }
                        },
                        roleTitle: true,
                        Status: true
                    }
                }
            }
        })

        const prompt = getprompt(JSON.stringify(data));


        const { output } = await generateText({
            model: google('gemini-2.5-flash'),
            prompt: prompt,
            output: Output.object({
                schema
            })
        })

        if (!output) {
            return Response.json({ success: true, message: 'No insights' }, { status: 200 })
        }

        await prisma.insights.upsert({
            where : {
                userId 
            },
            create : {
                userId,
                data : output
            },
            update : {
                data : output
            }
        })

        return Response.json({ success: true, message: 'Success' }, { status: 200 })


    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}  