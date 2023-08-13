-- DropIndex
DROP INDEX "Environment_key_idx";

-- DropIndex
DROP INDEX "History_projectId_idx";

-- DropIndex
DROP INDEX "Project_key_idx";

-- CreateIndex
CREATE INDEX "Environment_key_slug_idx" ON "Environment"("key", "slug");

-- CreateIndex
CREATE INDEX "Flag_slug_environmentId_idx" ON "Flag"("slug", "environmentId");

-- CreateIndex
CREATE INDEX "Project_key_slug_idx" ON "Project"("key", "slug");

-- CreateIndex
CREATE INDEX "User_email_name_idx" ON "User"("email", "name");
