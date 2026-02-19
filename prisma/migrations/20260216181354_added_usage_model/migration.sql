-- CreateTable
CREATE TABLE "Usage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "total_Applications" INTEGER DEFAULT 10,
    "total_resume" INTEGER DEFAULT 2,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usage_userId_key" ON "Usage"("userId");

-- AddForeignKey
ALTER TABLE "Usage" ADD CONSTRAINT "Usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
