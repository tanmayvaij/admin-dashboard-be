import { AuditLog } from "../../generated/prisma";
import { prisma } from "../database";

type Log = Omit<AuditLog, "success" | "createdAt" | "id">

export const createLog = async (log: Log) => {
  await prisma.auditLog.create({
    data: {
      action: log.action,
      actorId: log.actorId,
      target: log.target,
      success: log.statusCode < 400,
      statusCode: log.statusCode,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      errorMessage: log.errorMessage,
    },
  });
};
