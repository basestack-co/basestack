-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSON DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id","projectId")
);

-- CreateIndex
CREATE INDEX "History_projectId_idx" ON "History"("projectId");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
