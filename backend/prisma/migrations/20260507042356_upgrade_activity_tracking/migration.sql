-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActivityType" ADD VALUE 'STATUS';
ALTER TYPE "ActivityType" ADD VALUE 'ASSIGNMENT';
ALTER TYPE "ActivityType" ADD VALUE 'COMMUNICATION';
ALTER TYPE "ActivityType" ADD VALUE 'NEGOTIATION';
ALTER TYPE "ActivityType" ADD VALUE 'FINANCE';
