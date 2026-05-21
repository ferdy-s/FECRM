import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/hash";
import { validateRequired } from "@/utils/validator";

function generateTempPassword(length = 8) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export const userService = {
  async invite(data: {
    name: string;
    email: string;
    role: string;
    createdBy: string;
  }) {
    validateRequired({
      name: data.name,
      email: data.email,
      role: data.role,
    });

    // cek email sudah ada
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new Error("Email already exists");
    }

    const tempPassword = generateTempPassword();
    const passwordHash = await hashPassword(tempPassword);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role as any,
        auth: {
          create: {
            passwordHash,
          },
        },
      },
    });

    return {
      user,
      tempPassword,
    };
  },
};