import { Status } from "../generated/prisma";
import prisma from "../prisma";

export async function UpdateStatus(userId: string, applicationId: string, Status: Status) {
    await prisma.application.update({
        where: {
            userId,
            id: applicationId
        },
        data: {
            Status
        }
    })
}