import { getprompt } from "@/lib/Database/prompt/PromptText";
import prisma from "@/lib/prisma";
import { Outputschema } from "@/lib/Database/Schema/OutputSchema";
import { google } from '@ai-sdk/google';
import { generateText, Output } from 'ai';

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

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
                schema: Outputschema
            })
        })

        if (!output) {
            return Response.json({ success: true, message: 'No insights' }, { status: 200 })
        }

        const outputwithid = output.map((item) => {
            return {
                ...item,
                id: crypto.randomUUID()
            }
        })

        await prisma.insights.upsert({
            where: {
                userId
            },
            create: {
                userId,
                data: outputwithid
            },
            update: {
                data: outputwithid
            }
        })

        return Response.json({ success: true, message: 'Success' }, { status: 200 })


    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}  