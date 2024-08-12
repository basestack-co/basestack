-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "blockIpAddresses" TEXT,
ADD COLUMN     "emails" TEXT,
ADD COLUMN     "errorUrl" VARCHAR(2183),
ADD COLUMN     "hasDataQueryString" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "hasSpamProtection" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "rules" JSON DEFAULT '{}',
ADD COLUMN     "successUrl" VARCHAR(2183),
ADD COLUMN     "webhookUrl" VARCHAR(2183);

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "isSpam" DROP NOT NULL,
ALTER COLUMN "isSpam" DROP DEFAULT;
