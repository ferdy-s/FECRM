import { Inbox } from "lucide-react";

export default function ActivityEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
      <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />

      <h3 className="font-semibold">
        No Activity Found
      </h3>

      <p className="text-sm text-muted-foreground">
        There are no CRM activities available.
      </p>
    </div>
  );
}