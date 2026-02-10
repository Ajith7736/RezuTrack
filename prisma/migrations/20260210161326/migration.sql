/*
  Warnings:

  - You are about to drop the column `icon` on the `Insights` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Insights` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Insights` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Insights` table. All the data in the column will be lost.
  - Added the required column `data` to the `Insights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Insights" DROP COLUMN "icon",
DROP COLUMN "message",
DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "data" JSONB NOT NULL;

-- DropEnum
DROP TYPE "InsightType";
