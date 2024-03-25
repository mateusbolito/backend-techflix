import prismaClient from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface AuthServiceProps {
  email: string;
  password: string;
}
class AuthService {
  async authenticate({ email, password }: AuthServiceProps): Promise<string> {
    console.log("Autenticando usuário...");
    console.log("Email:", email);
    console.log("Senha:", password);

    const user = await prismaClient.customer.findUnique({ where: { email } });
    if (!user) {
      throw new Error("usuario nao encontrado verifique suas credenciais");
    }
    console.log("Usuário encontrado:", user);

    const userPassword = user.password;
    if (!userPassword) {
      throw new Error("Senha em Branco");
    }

    const secretkey =
      "988d13f5059e0cea7d6a2fea72502a1103d3347f2c1f6c50d93853eba3038fb7";

    console.log("senha password:", password);

    const token = jwt.sign({ userId: user.id }, secretkey, {
      expiresIn: "8h",
    });
    return token;
  }
}

export { AuthService };
