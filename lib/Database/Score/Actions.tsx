import prisma from "@/lib/prisma";
import { ScoreProps } from "../Schema/ScoreSchema";

export async function UpsertScoredata(userId: string, data: ScoreProps) {
    await prisma.score.upsert({
        where: {
            userId
        },
        create: {
            Scoredata: data,
            userId
        },
        update: {
            Scoredata: data
        }
    })
}