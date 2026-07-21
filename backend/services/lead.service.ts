import { prisma } from "@/lib/prisma";
import { activityService } from "./activity.service";

export const leadService = {
  async create(data: any, user: any) {
   if (
  !data.name ||
  !data.sourceId ||
  !data.assignedTo
) {
  throw new Error("Missing required fields");
}

if (
  data.email &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
) {
  throw new Error("Invalid email format");
}

    // VALIDATE USER
    const assignedUser = await prisma.user.findUnique({
      where: { id: data.assignedTo },
    });

    if (!assignedUser) {
      throw new Error("Assigned user not found");
    }

    // CREATE LEAD
  const lead = await prisma.lead.create({
  data: {
    //////////////////////////////////////////////////
    // BASIC INFORMATION
    //////////////////////////////////////////////////

    name: data.name,

    company: data.company,

    email: data.email,

    phone: data.phone,

    //////////////////////////////////////////////////
    // ADDRESS
    //////////////////////////////////////////////////

    address: data.address,

    district: data.district,

    city: data.city,

    province: data.province,

    postalCode: data.postalCode,

    country: data.country ?? "Indonesia",

    //////////////////////////////////////////////////
    // RELATION
    //////////////////////////////////////////////////

    source: {
      connect: {
        id: data.sourceId,
      },
    },

    assignee: {
      connect: {
        id: data.assignedTo,
      },
    },

    creator: {
      connect: {
        id: user.userId,
      },
    },

    //////////////////////////////////////////////////
    // SYSTEM
    //////////////////////////////////////////////////

    lastActivityAt: new Date(),
  },
});

    // ACTIVITY LOG
    await activityService.log({
      leadId: lead.id,
      userId: user.userId,
      type: "SYSTEM",
      description: "Lead created",
    });

    // AUDIT LOG
    await prisma.auditLog.create({
      data: {
        entity: "Lead",
        entityId: lead.id,
        action: "CREATE",
        userId: user.userId,
      },
    });

    return lead;
  },

  async assign(leadId: string, assignedTo: string, user: any) {
    // VALIDATE LEAD
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      throw new Error("Lead not found");
    }

    // VALIDATE USER
    const assignedUser = await prisma.user.findUnique({
      where: { id: assignedTo },
    });

    if (!assignedUser) {
      throw new Error("Assigned user not found");
    }

    // UPDATE LEAD
    const lead = await prisma.lead.update({
      where: { id: leadId },

      data: {
        assignee: {
          connect: {
            id: assignedTo,
          },
        },

        lastActivityAt: new Date(),
      },
    });

    // ACTIVITY
    await activityService.log({
      leadId,
      userId: user.userId,
      type: "ASSIGNMENT",
      description: `Assigned to ${assignedUser.email}`,
    });

    // AUDIT
    await prisma.auditLog.create({
      data: {
        entity: "Lead",
        entityId: leadId,
        action: "ASSIGN",
        userId: user.userId,
      },
    });

    return lead;
  },

  async detail(id: string) {

  const lead =
    await prisma.lead.findUnique({

      where: {
        id,
      },

     include: {

  source: true,

  assignee: true,

  creator: true,

  activities: true,

  communications: true,

  deals: {

    include: {

      items: true,

      invoices: true,

      negotiations: true,

    },

  },

},

    });

  if (!lead) {
    throw new Error(
      "Lead not found"
    );
  }

  return lead;
},

async update(
  leadId: string,
  data: any,
  user: any,
) {

  //////////////////////////////////////////////////
// VALIDATE LEAD
//////////////////////////////////////////////////

const existingLead =
  await prisma.lead.findUnique({

    where: {
      id: leadId,
    },

    include: {
      deals: true,
    },

  });

if (!existingLead) {
  throw new Error(
    "Lead not found",
  );
}

//////////////////////////////////////////////////
// LOCK LEAD
//////////////////////////////////////////////////

if (
  existingLead.deals.length > 0
) {
  throw new Error(
    "Lead has been converted to Deal and can no longer be modified.",
  );
}

  //////////////////////////////////////////////////
  // VALIDATE ASSIGNEE
  //////////////////////////////////////////////////

  const assignedUser =
    await prisma.user.findUnique({
      where: {
        id: data.assignedTo,
      },
    });

  if (!assignedUser) {
    throw new Error(
      "Assigned user not found",
    );
  }

  //////////////////////////////////////////////////
  // VALIDATE SOURCE
  //////////////////////////////////////////////////

  const source =
    await prisma.leadSource.findUnique({
      where: {
        id: data.sourceId,
      },
    });

  if (!source) {
    throw new Error(
      "Lead source not found",
    );
  }

  //////////////////////////////////////////////////
  // EMAIL VALIDATION
  //////////////////////////////////////////////////

  if (
    data.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      data.email,
    )
  ) {
    throw new Error(
      "Invalid email format",
    );
  }

  //////////////////////////////////////////////////
  // UPDATE LEAD
  //////////////////////////////////////////////////

  await prisma.lead.update({

    where: {
      id: leadId,
    },

    data: {

      //////////////////////////////////////////////////
      // BASIC
      //////////////////////////////////////////////////

      name: data.name,

      company: data.company,

      email: data.email,

      phone: data.phone,

      //////////////////////////////////////////////////
      // ADDRESS
      //////////////////////////////////////////////////

      address: data.address,

      district: data.district,

      city: data.city,

      province: data.province,

      postalCode: data.postalCode,

      country:
        data.country ??
        "Indonesia",

      //////////////////////////////////////////////////
      // RELATION
      //////////////////////////////////////////////////

      source: {
        connect: {
          id: data.sourceId,
        },
      },

      assignee: {
        connect: {
          id: data.assignedTo,
        },
      },

      //////////////////////////////////////////////////
      // STATUS
      //////////////////////////////////////////////////

      status: data.status,

      //////////////////////////////////////////////////
      // ACTIVITY
      //////////////////////////////////////////////////

      lastActivityAt:
        new Date(),

    },

  });

  //////////////////////////////////////////////////
  // ACTIVITY LOG
  //////////////////////////////////////////////////

  await activityService.log({

    leadId,

    userId:
      user.userId,

    type: "SYSTEM",

    description:
      "Lead information updated",

  });

  //////////////////////////////////////////////////
  // AUDIT LOG
  //////////////////////////////////////////////////

  await prisma.auditLog.create({

    data: {

      entity: "Lead",

      entityId: leadId,

      action: "UPDATE",

      userId:
        user.userId,

      newData: data,

    },

  });

  //////////////////////////////////////////////////
  // RETURN DETAIL
  //////////////////////////////////////////////////

  return this.detail(
    leadId,
  );

},

  async updateStatus(leadId: string, status: any, user: any) {
    // VALIDATE LEAD
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      throw new Error("Lead not found");
    }

    // UPDATE STATUS
    const lead = await prisma.lead.update({
      where: { id: leadId },

      data: {
        status,
        lastActivityAt: new Date(),
      },
    });

    // ACTIVITY
    await activityService.log({
      leadId,
      userId: user.userId,
      type: "STATUS",
      description: `Status changed to ${status}`,
    });

    // AUDIT
    await prisma.auditLog.create({
      data: {
        entity: "Lead",
        entityId: leadId,
        action: "STATUS_UPDATE",
        userId: user.userId,
        newData: {
          status,
        },
      },
    });

    return lead;
  },

  async list(user: any) {

  //////////////////////////////////////////////////
  // ADMIN / MANAGER / MARKETING
  //////////////////////////////////////////////////

  if (
    user.role === "ADMIN" ||
    user.role === "MANAGER" ||
    user.role === "MARKETING"
  ) {

    return prisma.lead.findMany({
      include: {
        assignee: true,
        source: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  }

  //////////////////////////////////////////////////
  // SALES
  //////////////////////////////////////////////////

  return prisma.lead.findMany({
    where: {
      assignedTo: user.userId,
    },

    include: {
      assignee: true,
      source: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
},

 async timeline(leadId: string) {
  const [activities, communications] = await Promise.all([
    prisma.activity.findMany({
      where: { leadId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    }),

    prisma.communicationLog.findMany({
      where: { leadId },
    }),
  ]);

  const timeline = [...activities, ...communications].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return timeline;
}
};