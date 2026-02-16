/*
  Warnings:

  - You are about to drop the `ResumeChanges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResumeChanges" DROP CONSTRAINT "ResumeChanges_new_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "ResumeChanges" DROP CONSTRAINT "ResumeChanges_old_resume_id_fkey";

-- DropTable
DROP TABLE "ResumeChanges";
