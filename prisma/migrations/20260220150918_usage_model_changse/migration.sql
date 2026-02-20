/*
  Warnings:

  - Made the column `current_Applications` on table `Usage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `current_Resumes` on table `Usage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usage" ALTER COLUMN "current_Applications" SET NOT NULL,
ALTER COLUMN "current_Resumes" SET NOT NULL;
