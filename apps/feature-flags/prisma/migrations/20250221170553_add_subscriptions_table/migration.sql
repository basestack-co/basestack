-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "blockIpAddresses" TEXT,
ADD COLUMN     "websites" TEXT;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "customerId" INTEGER,
    "productId" INTEGER,
    "variantId" INTEGER,
    "status" TEXT,
    "scheduleId" TEXT,
    "planId" TEXT NOT NULL,
    "event" TEXT,
    "billingCycleStart" TIMESTAMP(3) NOT NULL,
    "paused" BOOLEAN DEFAULT false,
    "cancelled" BOOLEAN DEFAULT false,
    "projects" INTEGER NOT NULL DEFAULT 0,
    "environments" INTEGER NOT NULL DEFAULT 0,
    "flags" INTEGER NOT NULL DEFAULT 0,
    "segments" INTEGER NOT NULL DEFAULT 0,
    "rollouts" INTEGER NOT NULL DEFAULT 0,
    "members" INTEGER NOT NULL DEFAULT 0,
    "apiRequests" INTEGER NOT NULL DEFAULT 0,
    "renewsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_scheduleId_key" ON "Subscription"("scheduleId");

-- CreateIndex
CREATE INDEX "Subscription_userId_subscriptionId_idx" ON "Subscription"("userId", "subscriptionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
