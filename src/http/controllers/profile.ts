import { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
