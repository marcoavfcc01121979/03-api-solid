import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymUseCase } from "./search-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search Gyn Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search gyms", async () => {
    await gymsRepository.create({
      title: "Java Script",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "typescript",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({
      query: "typescript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "typescript" })]);
  });

  it.skip("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `typescript ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await sut.execute({
      query: "typescript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "typescript 21" }),
      expect.objectContaining({ title: "typescript 22" }),
    ]);
  });
});
