interface ActivityHeaderProps {
  total: number;
}

export function ActivityHeader({
  total,
}: ActivityHeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Activity
        </h1>

        <p className="text-muted-foreground">
          Monitor all CRM activities across your
          organization.
        </p>
      </div>

      <div className="rounded-lg border bg-card px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Total Activities
        </p>

        <p className="text-2xl font-bold">
          {total}
        </p>
      </div>
    </div>
  );
}