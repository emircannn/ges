import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const getPrismaInstance = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  const dbUrl = new URL(connectionString);
  const adapter = new PrismaMariaDb({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port || "3306"),
    user: dbUrl.username,
    password: decodeURIComponent(dbUrl.password || ""),
    database: dbUrl.pathname.replace(/^\//, ""),
  });

  return new PrismaClient({ adapter });
};

export const db = globalForPrisma.prisma || getPrismaInstance();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
export default db;
