import z from "zod";

export const ProfileSchema = z.object({
    fullname: z.string().min(1, "This field is required"),
    professionaltitle: z.string().min(1, "This field is required"),
    email: z.email("Invalid email address").min(1, "This field is required"),
    phonenumber: z.string().min(1, "This field is required"),
    address: z.string().min(1, "This field is required")
})

export type ProfileInput = z.infer<typeof ProfileSchema>