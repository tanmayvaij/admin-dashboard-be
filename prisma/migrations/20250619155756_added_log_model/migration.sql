-- CreateEnum
CREATE TYPE "UserAction" AS ENUM ('USER_CREATED', 'USER_DELETED', 'GET_ALL_USERS', 'GET_USER_BY_ID', 'USER_UPDATED', 'PRODUCT_UPDATED', 'PRODUCT_DELETED', 'PRODUCT_CREATED');

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" "UserAction" NOT NULL,
    "actorId" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "metaData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AuditLog_id_key" ON "AuditLog"("id");
