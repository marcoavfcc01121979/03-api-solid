import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";

export function makeCheckInUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRespository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRespository);

  return useCase;
}
