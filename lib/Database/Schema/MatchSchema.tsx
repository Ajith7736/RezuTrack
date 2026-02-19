import z from "zod"

export const MatchSchema = z.object({
    resumeId: z.string().min(1, "Resume is required"),
    resumeName: z.string().min(1, "Resume is required"),
    applicationId: z.string().min(1, "Application is required"),
    companyName: z.string().min(1, "Application is required"),
    jobDescription: z.string().min(1, "No Job Description found")
})

export type MatchInputs = z.infer<typeof MatchSchema>