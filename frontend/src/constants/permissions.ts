import { Role } from "@/constants/roles";

export const permissions = {
  /* =======================================
   * LEAD
   * ======================================= */

 canViewLead: (role: Role) =>
[
  Role.ADMIN,
  Role.MARKETING,
  Role.SALES,
  Role.MANAGER,
  Role.FINANCE,
].includes(role),

  canCreateLead: (role: Role) =>
    [
      Role.MARKETING,
    ].includes(role),

  canEditLead: (role: Role) =>
    [
      Role.MARKETING,
      Role.SALES,
    ].includes(role),

  canAssignLead: (role: Role) =>
    [
      Role.MARKETING,
    ].includes(role),

  canConvertLead: (role: Role) =>
    [
      Role.SALES,
    ].includes(role),

  /* =======================================
   * DEAL
   * ======================================= */

  canViewDeal: (role: Role) =>
[
  Role.ADMIN,
  Role.SALES,
  Role.MANAGER,
  Role.FINANCE,
].includes(role),

  canCreateDeal: (role: Role) =>
    [
      Role.SALES,
    ].includes(role),

  canUpdateDeal: (role: Role) =>
    [
      Role.SALES,
    ].includes(role),

  /* =======================================
   * NEGOTIATION
   * ======================================= */

  canCreateNegotiation: (role: Role) =>
    [
      Role.SALES,
    ].includes(role),

  canApproveNegotiation: (role: Role) =>
    role === Role.MANAGER,

  /* =======================================
   * COMMUNICATION
   * ======================================= */

  canSendEmail: (role: Role) =>
    [
      Role.SALES,
    ].includes(role),

  canSendWhatsApp: (role: Role) =>
    [
      Role.SALES,
    ].includes(role),

  /* =======================================
   * PRODUCT
   * ======================================= */

  canManageProduct: (role: Role) =>
    role === Role.ADMIN,

  canManageService: (role: Role) =>
    role === Role.ADMIN,

  /* =======================================
   * INVOICE
   * ======================================= */

  canViewInvoice: (role: Role) =>
    [
      Role.FINANCE,
      Role.MANAGER,
    ].includes(role),

  canCreateInvoice: (role: Role) =>
    [
      Role.FINANCE,
    ].includes(role),

  canEditInvoice: (role: Role) =>
    [
      Role.FINANCE,
    ].includes(role),

  /* =======================================
   * PAYMENT
   * ======================================= */

  canViewPayment: (role: Role) =>
    [
      Role.FINANCE,
      Role.MANAGER,
    ].includes(role),

  canVerifyPayment: (role: Role) =>
    [
      Role.FINANCE,
    ].includes(role),

  /* =======================================
   * REPORT
   * ======================================= */

  canViewReport: (role: Role) =>
[
  Role.ADMIN,
  Role.MANAGER,
  Role.FINANCE,
  Role.MARKETING,
  Role.SALES,
].includes(role),

  /* =======================================
   * USER
   * ======================================= */

  canManageUser: (role: Role) =>
    role === Role.ADMIN,
};