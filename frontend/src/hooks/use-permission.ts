import { permissions } from "@/constants/permissions";
import { Role } from "@/constants/roles";

export function usePermission(role: Role) {
  return {
    canViewLead:
      permissions.canViewLead(role),

    canCreateLead:
      permissions.canCreateLead(role),

    canEditLead:
      permissions.canEditLead(role),

    canAssignLead:
      permissions.canAssignLead(role),

    canConvertLead:
      permissions.canConvertLead(role),

    canSendEmail:
      permissions.canSendEmail(role),

    canSendWhatsApp:
      permissions.canSendWhatsApp(role),

    canCreateInvoice:
      permissions.canCreateInvoice(role),

    canVerifyPayment:
      permissions.canVerifyPayment(role),

    canManageUser:
      permissions.canManageUser(role),

    canViewReport:
      permissions.canViewReport(role),
  };
}