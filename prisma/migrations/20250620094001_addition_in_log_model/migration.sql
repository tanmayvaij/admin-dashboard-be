/*
  Warnings:

  - Added the required column `statusCode` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "statusCode" INTEGER NOT NULL,
ADD COLUMN     "success" BOOLEAN NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ALTER COLUMN "actorId" DROP NOT NULL,
ALTER COLUMN "metaData" DROP NOT NULL;
