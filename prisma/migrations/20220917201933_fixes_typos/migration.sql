/*
  Warnings:

  - You are about to drop the column `teacherDiscipineId` on the `Tests` table. All the data in the column will be lost.
  - Added the required column `teacherDisciplineId` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_teacherDiscipineId_fkey";

-- AlterTable
ALTER TABLE "Tests" DROP COLUMN "teacherDiscipineId",
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "TeachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
