import z from "zod"

export const ApplicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  roleTitle: z.string().min(1, "Role title is required"),
  resumeId: z.string().min(1, "Resume is required"),
  resumeUsed: z.string().min(1, "Resume name is required"),
  date: z.date({
    error: 'Date is required'
  }).nullable(),
  jobDescription: z.string().optional(),
  link: z.string().optional(),
  status: z.enum([ "Applied", "Pending", "Interviewing", "No_Response", "Rejected", "Offer"]),
})

export type ApplicationInputs = z.infer<typeof ApplicationSchema>