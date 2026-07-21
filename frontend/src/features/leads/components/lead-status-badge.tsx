import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export function LeadStatusBadge({
  status,
}: Props) {
  const styles = {
    NEW:
      "bg-blue-100 text-blue-700",

    CONTACTED:
      "bg-purple-100 text-purple-700",

    QUALIFIED:
      "bg-green-100 text-green-700",

    NEGOTIATION:
      "bg-orange-100 text-orange-700",

    WON:
      "bg-emerald-100 text-emerald-700",

    LOST:
      "bg-red-100 text-red-700",
  };

  return (
    <Badge
      className={
        styles[
          status as keyof typeof styles
        ]
      }
    >
      {status}
    </Badge>
  );
}