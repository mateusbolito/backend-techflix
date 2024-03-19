import { AuthService } from "../services/LoginCustomerService";
import { FastifyRequest, FastifyReply } from "fastify";

class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  async login(requet: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = requet.body as {
        email: string;
        password: string;
        name: string;
      };

      const token = await this.authService.authenticate({
        email,
        password,
      });

      reply.send({ token });
    } catch (error) {
      reply.status(401).send({ error: "error de token" });
    }
  }
}

export { AuthController };
