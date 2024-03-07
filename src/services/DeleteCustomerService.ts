import prismaClient from "../prisma";

interface DeleteUser {
  id: string;
}
class DeleteCustomerService {
  async execute({ id }: DeleteUser) {
    if (!id) {
      throw new Error("solicitaçao invalida");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente not exist");
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    return { message: "Deletado com sucesso" };
  }
}
export { DeleteCustomerService };
