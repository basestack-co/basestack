/*
  Warnings:

  - You are about to alter the column `name` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `slug` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- DropForeignKey
ALTER TABLE "ProjectsOnUsers" DROP CONSTRAINT "ProjectsOnUsers_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(30);

-- AddForeignKey
ALTER TABLE "ProjectsOnUsers" ADD CONSTRAINT "ProjectsOnUsers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
