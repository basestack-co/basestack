/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Environment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Environment" ADD COLUMN     "key" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Environment_key_key" ON "Environment"("key");

-- CreateIndex
CREATE INDEX "Environment_key_idx" ON "Environment"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Project_key_key" ON "Project"("key");

-- CreateIndex
CREATE INDEX "Project_key_idx" ON "Project"("key");
