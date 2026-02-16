import z, { success } from "zod";

export async function POST(req: Request) {
    try {

        const { userId, resumeId, applicationId } = await req.json();

        const OuputSchema = z.object({
            score: z.number().min(1).max(100),
            missing: z.array(z.string()),
            emphasize: z.array(z.string())
        })

        


    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, {
            headers: {
                "Content-Type": "application/json"
            }, status: 500
        })
    }
}