import { PrismaClient } from "@prisma/client";
import { env } from "../env/index";

//export const prisma = new PrismaClient();
/*export const prisma = new PrismaClient({
  log: ["query"],
});*/

export const prisma = new PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
