import { Status } from "../../generated/prisma";
import prisma from "../../prisma";

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

export async function GetApplicationById(applicationId: string) {
    const data = await prisma.application.findUnique({
        where: {
            id: applicationId
        },
        select: {
            companyName: true,
            roleTitle: true,
            jobDescription: true,
            Resume: {
                select: {
                    resumeContent: true,
                    name: true
                }
            }
        }
    })
    const returndata = { ...data?.Resume, companyName: data?.companyName, jobDescription: data?.jobDescription, roleTitle: data?.roleTitle }

    return returndata;
}