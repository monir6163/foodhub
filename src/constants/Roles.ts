export const ROLES = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  PROVIDER: "provider",
} as const;

export type Roles = (typeof ROLES)[keyof typeof ROLES];
