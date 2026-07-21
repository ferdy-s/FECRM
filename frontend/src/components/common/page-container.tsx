import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "space-y-6 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}