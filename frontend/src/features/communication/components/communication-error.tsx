import {
  AlertTriangle,
} from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface Props {
  message?: string;
}

export function CommunicationError({
  message = "Unable to load communication history.",
}: Props) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />

      <AlertTitle>
        Error
      </AlertTitle>

      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
}