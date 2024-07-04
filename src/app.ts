import fastifyjwt from "@fastify/jwt";
import fastify, { FastifyReply } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(fastifyjwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
