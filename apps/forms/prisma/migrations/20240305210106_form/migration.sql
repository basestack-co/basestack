/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectsOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('DYNAMIC', 'STATIC');

-- DropForeignKey
ALTER TABLE "ProjectsOnUsers" DROP CONSTRAINT "ProjectsOnUsers_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectsOnUsers" DROP CONSTRAINT "ProjectsOnUsers_userId_fkey";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectsOnUsers";

-- CreateTable
CREATE TABLE "form" (
    "form_id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "type" "FormType" NOT NULL DEFAULT 'STATIC',
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "has_retention" BOOLEAN NOT NULL DEFAULT true,
    "redirect_url" VARCHAR(2183),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "form_pkey" PRIMARY KEY ("form_id")
);

-- CreateTable
CREATE TABLE "form_on_users" (
    "form_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "form_on_users_pkey" PRIMARY KEY ("form_id","user_id")
);

-- CreateTable
CREATE TABLE "submission" (
    "submission_id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "is_spam" BOOLEAN NOT NULL DEFAULT false,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "data" JSON NOT NULL,
    "metadata" JSON,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("submission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "form_form_id_key" ON "form"("form_id");

-- CreateIndex
CREATE INDEX "form_name_idx" ON "form"("name");

-- CreateIndex
CREATE INDEX "form_on_users_form_id_idx" ON "form_on_users"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "form_on_users_form_id_user_id_key" ON "form_on_users"("form_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "submission_submission_id_key" ON "submission"("submission_id");

-- CreateIndex
CREATE INDEX "submission_form_id_idx" ON "submission"("form_id");

-- AddForeignKey
ALTER TABLE "form_on_users" ADD CONSTRAINT "form_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_on_users" ADD CONSTRAINT "form_on_users_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "form"("form_id") ON DELETE CASCADE ON UPDATE CASCADE;
