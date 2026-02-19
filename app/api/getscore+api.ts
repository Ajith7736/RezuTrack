import { GetApplicationById } from "@/lib/Database/Applications/Actions";
import { ScorePrompt } from "@/lib/Database/prompt/ScorePrompt";
import { scoreOuputSchema } from "@/lib/Database/Schema/ScoreSchema";
import { UpsertScoredata } from "@/lib/Database/Score/Actions";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import z from "zod";

export async function POST(req: Request) {
    try {

        const { userId, applicationId } = await req.json();


        const data = await GetApplicationById(applicationId);

        const prompt = ScorePrompt(JSON.stringify(data));

        const { output } = await generateText({
            model: google('gemini-2.5-flash'),
            output: Output.object({
                schema: scoreOuputSchema
            }),
            prompt
        })

        console.log(output);

        if (!output) {
            return Response.json({ success: false, message: "Analysis failed" }, {
                headers: {
                    "Content-Type": "application/json"
                }, status: 400
            })
        }

        await UpsertScoredata(userId, output);


        return Response.json({ success: true, message: "Successfull", output })

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, {
            headers: {
                "Content-Type": "application/json"
            }, status: 500
        })
    }
}