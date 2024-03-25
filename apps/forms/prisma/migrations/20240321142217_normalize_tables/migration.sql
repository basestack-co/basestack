/*
  Warnings:

  - You are about to drop the `form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `form_on_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "form_on_users" DROP CONSTRAINT "form_on_users_form_id_fkey";

-- DropForeignKey
ALTER TABLE "form_on_users" DROP CONSTRAINT "form_on_users_user_id_fkey";

-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_form_id_fkey";

-- DropTable
DROP TABLE "form";

-- DropTable
DROP TABLE "form_on_users";

-- DropTable
DROP TABLE "submission";

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "type" "FormType" NOT NULL DEFAULT 'STATIC',
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "hasRetention" BOOLEAN NOT NULL DEFAULT true,
    "redirectUrl" VARCHAR(2183),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormOnUsers" (
    "form_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FormOnUsers_pkey" PRIMARY KEY ("form_id","user_id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "isSpam" BOOLEAN NOT NULL DEFAULT false,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "data" JSON NOT NULL DEFAULT '{}',
    "metadata" JSON DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_id_key" ON "Form"("id");

-- CreateIndex
CREATE INDEX "Form_name_idx" ON "Form"("name");

-- CreateIndex
CREATE INDEX "FormOnUsers_form_id_idx" ON "FormOnUsers"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "FormOnUsers_form_id_user_id_key" ON "FormOnUsers"("form_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_id_key" ON "Submission"("id");

-- CreateIndex
CREATE INDEX "Submission_formId_idx" ON "Submission"("formId");

-- AddForeignKey
ALTER TABLE "FormOnUsers" ADD CONSTRAINT "FormOnUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormOnUsers" ADD CONSTRAINT "FormOnUsers_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
