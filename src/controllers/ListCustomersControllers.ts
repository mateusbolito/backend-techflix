import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../services/ListCustomerServices";

class ListCustomerControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCustomer = new ListCustomerService();

    const customer = await listCustomer.execute();

    reply.send(customer);
  }
}

export { ListCustomerControllers };
