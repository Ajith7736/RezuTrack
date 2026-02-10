-- CreateEnum
CREATE TYPE "InsightType" AS ENUM ('info', 'success', 'error', 'warning');

-- CreateTable
CREATE TABLE "Insights" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "InsightType" NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Insights_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Insights" ADD CONSTRAINT "Insights_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
