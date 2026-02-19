import z from "zod";

export const Outputschema = z.array(z.object({
    icon: z.string(),
    type: z.enum(["info", "success", "warning", "error"]),
    title: z.string(),
    message: z.string()
}))

export type insight = {
    id: string,
    icon: string;
    type: "success" | "info" | "warning" | "error";
    title: string;
    message: string;
}



