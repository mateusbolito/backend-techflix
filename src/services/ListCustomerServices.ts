import prismaClient from "../prisma";

class ListCustomerService {
  async execute() {
    const listers = await prismaClient.customer.findMany();
    return listers;
  }
}

export { ListCustomerService };
