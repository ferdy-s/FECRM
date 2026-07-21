import { ReactNode } from "react";

interface ActivityContentProps {
  timeline: ReactNode;
  table: ReactNode;
}

export function ActivityContent({
  timeline,
  table,
}: ActivityContentProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-12">
      <section className="xl:col-span-4">
        {timeline}
      </section>

      <section className="xl:col-span-8">
        {table}
      </section>
    </div>
  );
}