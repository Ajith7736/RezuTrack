import z from "zod"

export const Resumeformschema = z.object({
    name: z.string().min(1, "This is required"),
    resumeContent: z.string().min(1, "This is required"),
    notes: z.string().optional()
})

export type ResumeformInputs = z.infer<typeof Resumeformschema>