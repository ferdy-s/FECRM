export default function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 rounded bg-muted animate-pulse" />
      <div className="h-48 rounded bg-muted animate-pulse" />
      <div className="h-96 rounded bg-muted animate-pulse" />
    </div>
  );
}