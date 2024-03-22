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

    const secretkey = process.env.JWT_SECRET_KEY as string;
    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      throw new Error("senha incorreta");
    }
    console.log("senha password:", passwordMatch);

    const token = jwt.sign({ userId: user.id }, secretkey, {
      expiresIn: "8h",
    });
    return token;
  }
}

export { AuthService };
