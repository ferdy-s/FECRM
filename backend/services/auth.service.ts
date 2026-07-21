import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/utils/hash";
import { signJwt } from "@/lib/jwt";

export const authService = {
  async login(
    email: string,
    password: string
  ) {

    const user =
      await prisma.user.findUnique({
        where: { email },
        include: { auth: true },
      });

    if (!user || !user.auth) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const isValid =
      await comparePassword(
        password,
        user.auth.passwordHash
      );

    if (!isValid) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const token = signJwt({
      userId: user.id,
      role: user.role,
    });

    return {
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
};