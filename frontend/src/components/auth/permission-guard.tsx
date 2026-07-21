interface PermissionGuardProps {
  allow: boolean;
  children: React.ReactNode;
}

export function PermissionGuard({
  allow,
  children,
}: PermissionGuardProps) {
  if (!allow) {
    return null;
  }

  return <>{children}</>;
}