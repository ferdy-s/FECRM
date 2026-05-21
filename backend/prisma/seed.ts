import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@crm.com";
  const password = "admin123";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const passwordHash = await bcryptjs.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: "Super Admin",
      email,
      role: "ADMIN",
      auth: {
        create: {
          passwordHash,
        },
      },
    },
  });

  console.log("✅ Admin created:");
  console.log({
    email,
    password,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());