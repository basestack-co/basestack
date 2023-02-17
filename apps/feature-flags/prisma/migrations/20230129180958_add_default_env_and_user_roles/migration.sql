-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Environment" ADD COLUMN     "isDefault" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "ProjectsOnUsers" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';
