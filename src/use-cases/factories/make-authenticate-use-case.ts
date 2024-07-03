import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUserRepository();
  const authenticateUseCae = new AuthenticateUseCase(prismaUsersRepository);

  return authenticateUseCae;
}
