import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare, hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });
  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john@john.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "john@john.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "john@john.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john@john.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "john@john.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
