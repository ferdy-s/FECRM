import { Role } from "@/constants/roles";

export const permissions = {

  /* =====================
     LEADS
  ====================== */

  canViewLead(role: Role) {
    return [
      Role.ADMIN,
      Role.MANAGER,
      Role.MARKETING,
      Role.SALES,
    ].includes(role);
  },

  canCreateLead(role: Role) {
    return [
      Role.ADMIN,
      Role.MARKETING,
    ].includes(role);
  },

  canEditLead(role: Role) {
    return [
      Role.ADMIN,
      Role.MARKETING,
    ].includes(role);
  },

  canDeleteLead(role: Role) {
    return [
      Role.ADMIN,
    ].includes(role);
  },

  canAssignLead(role: Role) {
    return [
      Role.ADMIN,
      Role.MARKETING,
    ].includes(role);
  },

  /* =====================
     DEALS
  ====================== */

  canViewDeal(role: Role) {
    return [
      Role.ADMIN,
      Role.SALES,
      Role.FINANCE,
      Role.MANAGER,
    ].includes(role);
  },

  canCreateDeal(role: Role) {
    return [
      Role.ADMIN,
      Role.SALES,
    ].includes(role);
  },

  canEditDeal(role: Role) {
    return [
      Role.ADMIN,
      Role.SALES,
    ].includes(role);
  },

  canDeleteDeal(role: Role) {
    return [
      Role.ADMIN,
    ].includes(role);
  },

  /* =====================
     NEGOTIATION
  ====================== */

  canCreateNegotiation(role: Role) {
    return [
      Role.SALES,
    ].includes(role);
  },

  canApproveNegotiation(role: Role) {
    return [
      Role.MANAGER,
    ].includes(role);
  },

  canRejectNegotiation(role: Role) {
    return [
      Role.MANAGER,
    ].includes(role);
  },

  /* =====================
     PRODUCT
  ====================== */

  canViewProduct(role: Role) {
    return [
      Role.ADMIN,
      Role.SALES,
      Role.MANAGER,
    ].includes(role);
  },

  canManageProduct(role: Role) {
    return [
      Role.ADMIN,
    ].includes(role);
  },

  /* =====================
     SERVICE
  ====================== */

  canViewService(role: Role) {
    return [
      Role.ADMIN,
      Role.SALES,
      Role.MANAGER,
    ].includes(role);
  },

  canManageService(role: Role) {
    return [
      Role.ADMIN,
    ].includes(role);
  },

  /* =====================
     INVOICE
  ====================== */

  canViewInvoice(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
      Role.MANAGER,
    ].includes(role);
  },

  canCreateInvoice(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
    ].includes(role);
  },

  canEditInvoice(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
    ].includes(role);
  },

  /* =====================
     PAYMENT
  ====================== */

  canViewPayment(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
      Role.MANAGER,
    ].includes(role);
  },

  canVerifyPayment(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
    ].includes(role);
  },

  canRejectPayment(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
    ].includes(role);
  },

  /* =====================
     COLLECTION
  ====================== */

  canViewCollection(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
      Role.MANAGER,
    ].includes(role);
  },

  canManageCollection(role: Role) {
    return [
      Role.ADMIN,
      Role.FINANCE,
    ].includes(role);
  },

  /* =====================
     COMMUNICATION
  ====================== */

  canViewCommunication(role: Role) {
    return [
      Role.ADMIN,
      Role.MARKETING,
      Role.SALES,
      Role.MANAGER,
    ].includes(role);
  },

  /* =====================
     USERS
  ====================== */

  canManageUsers(role: Role) {
    return role === Role.ADMIN;
  },

  /* =====================
     SETTINGS
  ====================== */

  canManageSettings(role: Role) {
    return role === Role.ADMIN;
  },

  /* =====================
     REPORTS
  ====================== */

  canViewSalesReport(role: Role) {
    return [
      Role.ADMIN,
      Role.MANAGER,
      Role.SALES,
    ].includes(role);
  },

  canViewPipelineReport(role: Role) {
    return [
      Role.ADMIN,
      Role.MANAGER,
      Role.MARKETING,
    ].includes(role);
  },

  canViewCollectionReport(role: Role) {
    return [
      Role.ADMIN,
      Role.MANAGER,
      Role.FINANCE,
    ].includes(role);
  },

  canViewRevenueReport(role: Role) {
    return [
      Role.ADMIN,
      Role.MANAGER,
      Role.FINANCE,
    ].includes(role);
  },

  canViewActivityReport(role: Role) {
    return [
      Role.ADMIN,
      Role.MANAGER,
    ].includes(role);
  },

  canViewCommunicationReport(role: Role) {
    return [
      Role.ADMIN,
      Role.MANAGER,
      Role.MARKETING,
    ].includes(role);
  },

};