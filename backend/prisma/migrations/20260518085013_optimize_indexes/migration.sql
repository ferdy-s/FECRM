/*
  Warnings:

  - A unique constraint covering the columns `[leadId]` on the table `deals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DealStatus" ADD VALUE 'NEGOTIATION';
ALTER TYPE "DealStatus" ADD VALUE 'INVOICED';
ALTER TYPE "DealStatus" ADD VALUE 'PAID';

-- CreateIndex
CREATE INDEX "activities_createdAt_idx" ON "activities"("createdAt");

-- CreateIndex
CREATE INDEX "communication_logs_createdAt_idx" ON "communication_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "deals_leadId_key" ON "deals"("leadId");

-- CreateIndex
CREATE INDEX "deals_createdAt_idx" ON "deals"("createdAt");

-- CreateIndex
CREATE INDEX "invoices_issuedAt_idx" ON "invoices"("issuedAt");

-- CreateIndex
CREATE INDEX "leads_lastActivityAt_idx" ON "leads"("lastActivityAt");

-- CreateIndex
CREATE INDEX "payments_createdAt_idx" ON "payments"("createdAt");
