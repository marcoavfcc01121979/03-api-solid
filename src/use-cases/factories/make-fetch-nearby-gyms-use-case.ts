import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
