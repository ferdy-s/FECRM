import { Badge } from "@/components/ui/badge";

interface Props {
  value: string;
}

export function StatusBadge({
  value,
}: Props) {
  return (
    <Badge>
      {value}
    </Badge>
  );
}