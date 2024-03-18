import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    if (!email || !password || !name) {
      reply.code(404).send({ error: "Invalid email or password" });
    }

    const customerService = new CreateCustomerService();

    try {
      const customer = await customerService.execute({ name, email, password });

      reply.send(customer);
    } catch (error) {
      reply.code(500).send({ error: "erro ao criar cliente" });
    }
  }
}

export { CreateCustomerController };
