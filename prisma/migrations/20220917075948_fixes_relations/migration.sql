/*
  Warnings:

  - Added the required column `teacherDiscipineId` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tests" ADD COLUMN     "teacherDiscipineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_teacherDiscipineId_fkey" FOREIGN KEY ("teacherDiscipineId") REFERENCES "TeachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
