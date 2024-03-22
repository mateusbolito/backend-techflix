import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { ListCustomerControllers } from "./controllers/ListCustomersControllers";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import crypto from "crypto";
import { AuthService } from "./services/LoginCustomerService";
export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  interface LoginRequestBody {
    email: string;
    password: string;
  }
  const authService = new AuthService();

  fastify.get("/teste", async (req: FastifyRequest, res: FastifyReply) => {
    return { ok: true };
  });

  fastify.post(
    "/register",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(request, reply);
    }
  );

  fastify.post(
    "/login",
    async (
      req: FastifyRequest<{ Body: LoginRequestBody }>,
      res: FastifyReply
    ) => {
      try {
        const { email, password } = req.body;
        const token = await authService.authenticate({ email, password });
        res.send({ token });
      } catch (error) {
        res.status(401).send({ error: "usuario nao autenticado" });
      }
    }
  );

  fastify.get(
    "/customers",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomerControllers().handle(request, reply);
    }
  );

  fastify.delete(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply);
    }
  );

  fastify.get(
    "/secret",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const jwtSecretKey = crypto.randomBytes(32).toString("hex");

        return { jwtSecretKey };
      } catch (error) {
        reply.status(500).send({ error: "Erro ao gerar a chave secreta" });
      }
    }
  );
}
