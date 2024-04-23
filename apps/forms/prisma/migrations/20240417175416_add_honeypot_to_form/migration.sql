-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "honeypot" VARCHAR(30) DEFAULT '_trap',
ALTER COLUMN "hasSpamProtection" SET DEFAULT true;
