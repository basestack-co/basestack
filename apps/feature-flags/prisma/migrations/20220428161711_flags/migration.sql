-- AlterTable
ALTER TABLE "Environment" ADD COLUMN     "description" VARCHAR(250);

-- CreateTable
CREATE TABLE "Flag" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "description" VARCHAR(250),
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "payload" JSON DEFAULT '{}',
    "expiredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "environmentId" TEXT NOT NULL,

    CONSTRAINT "Flag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flag" ADD CONSTRAINT "Flag_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
