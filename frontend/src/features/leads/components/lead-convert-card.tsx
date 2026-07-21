"use client";

import {
  Lock,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  usePermission,
} from "@/hooks/use-permission";

import {
  useConvertLead,
} from "@/hooks/use-convert-lead";

import {
  Role,
} from "@/constants/roles";

interface Props {
  role: Role;
  leadId: string;
  isConverted: boolean;
}

export function LeadConvertCard({
  role,
  leadId,
  isConverted,
}: Props) {

  const permission =
    usePermission(role);

  const mutation =
    useConvertLead();

  if (
    !permission.canConvertLead
  ) {
    return null;
  }

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Convert To Deal
        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-4">

        {isConverted && (

          <Alert
            className="
              border-amber-300
              bg-amber-50
            "
          >

            <Lock
              className="
                h-4
                w-4
              "
            />

            <AlertTitle>

              Lead Locked

            </AlertTitle>

            <AlertDescription>

              Lead ini sudah berhasil
              dikonversi menjadi Deal.

              Seluruh data Lead tidak
              dapat diubah lagi.

            </AlertDescription>

          </Alert>

        )}

        <Button

          className="w-full"

          disabled={
            isConverted ||
            mutation.isPending
          }

          onClick={() =>
            mutation.mutate({
              leadId,
            })
          }

        >

          {mutation.isPending
            ? "Converting..."
            : isConverted
              ? "Already Converted"
              : "Convert To Deal"}

        </Button>

      </CardContent>

    </Card>
  );

}