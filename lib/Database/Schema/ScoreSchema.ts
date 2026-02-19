import z from "zod";

export const scoreOuputSchema = z.object({
    score: z.number().min(1).max(100),
    missing: z.array(z.string()),
    emphasize: z.array(z.string())
})

export type ScoreProps = {
    score: number,
    missing: string[],
    emphasize: string[]
}