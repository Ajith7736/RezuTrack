import prisma from "@/lib/prisma";
import { success } from "zod";
import applications from "../(tabs)/applications";

export async function POST(request: Request) {
    try {
        const { lastId, userId } = await request.json();

        const data = await prisma.application.findMany({
            where: {
                userId
            },
            take: 10,
            ...(lastId && {
                cursor: {
                    id: lastId
                }, skip: 1
            })
        })



        return Response.json({ success: false, applications: data }, { status: 200 })


    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}