import prismaClient from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface AuthServiceProps {
  email: string;
  password: string;
}
class AuthService {
  async authenticate({ email, password }: AuthServiceProps): Promise<string> {
    const user = await prismaClient.customer.findUnique({ where: { email } });
    if (!user) {
      throw new Error("usuario nao encontrado verifique suas credenciais");
    }
    const userPassword = user.password;
    if (!userPassword) {
      throw new Error("Senha em Branco");
    }

    const passwordMatch = await bcrypt.compare(password, userPassword);
    if (!passwordMatch) {
      throw new Error("senha incorreta");
    }
    const token = jwt.sign(
      { userId: user.id },
      "9cd5a0f873a1dcdcc6c2d8bf6aff1b96cf4b1454e24e1ee01234f2a32524aeb2",
      {
        expiresIn: "4h",
      }
    );
    return token;
  }
}

export { AuthService };
