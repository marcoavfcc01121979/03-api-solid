import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
}
