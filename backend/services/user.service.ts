import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/hash";
import { validateRequired } from "@/utils/validator";
import { generateTemporaryPassword } from "@/utils/password";

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

  async detail(id: string) {

  const user =
    await prisma.user.findUnique({

      where: {
        id,
      },

      include: {
        auth: false,
      },

    });

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return user;
},

async update(
  id: string,
  data: any
) {

  const existing =
    await prisma.user.findUnique({

      where: {
        id,
      },

    });

  if (!existing) {
    throw new Error(
      "User not found"
    );
  }

  return prisma.user.update({

    where: {
      id,
    },

    data: {

      name:
        data.name ??
        existing.name,

      email:
        data.email ??
        existing.email,

      role:
        data.role ??
        existing.role,

      isActive:
        data.isActive ??
        existing.isActive,

    },

  });
},

async delete(id: string) {

  const existing =
    await prisma.user.findUnique({

      where: {
        id,
      },

    });

  if (!existing) {
    throw new Error(
      "User not found"
    );
  }

  return prisma.user.update({

    where: {
      id,
    },

    data: {

      isActive: false,

      deletedAt:
        new Date(),

    },

  });
},

async resetPassword(id: string) {

  const user =
    await prisma.user.findUnique({

      where: {
        id,
      },

      include: {
        auth: true,
      },

    });

  if (!user) {

    throw new Error(
      "User not found"
    );

  }

  if (!user.auth) {

    throw new Error(
      "Authentication data not found"
    );

  }

  const temporaryPassword =
    generateTemporaryPassword();

  const passwordHash =
    await hashPassword(
      temporaryPassword
    );

  await prisma.auth.update({

    where: {
      userId: id,
    },

    data: {
      passwordHash,
    },

  });

  return {

    user: {

      id: user.id,

      name: user.name,

      email: user.email,

      role: user.role,

    },

    temporaryPassword,

  };

},

async statistics(id: string) {

  const totalLead =
    await prisma.lead.count({

      where: {
        assignedTo: id,
      },

    });

  const totalDeal =
    await prisma.deal.count({

      where: {
        assignedTo: id,
      },

    });

  const wonDeal =
    await prisma.deal.count({

      where: {

        assignedTo: id,

        status: "WON",

      },

    });

  const conversionRate =
    totalDeal === 0
      ? 0
      : (
          wonDeal /
          totalDeal
        ) * 100;

  return {

    totalLead,

    totalDeal,

    wonDeal,

    conversionRate:
      Number(
        conversionRate.toFixed(2)
      ),

  };
},

async list(filters?: any) {

  const where: any = {};

  if (filters?.role) {
    where.role = filters.role;
  }

  if (filters?.isActive) {

  where.isActive =
    filters.isActive === "true";

}

  if (filters?.search) {

    where.OR = [

      {
        name: {
          contains: filters.search,
          mode: "insensitive",
        },
      },

      {
        email: {
          contains: filters.search,
          mode: "insensitive",
        },
      },

    ];
  }

  return prisma.user.findMany({

    where,

    include: {
      auth: false,
    },

    orderBy: {
      createdAt: "desc",
    },

  });
}

};



