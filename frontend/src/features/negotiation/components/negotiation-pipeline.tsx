"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Progress,
} from "@/components/ui/progress";

import {
  Negotiation,
} from "../types/negotiation";

interface Props {
  data: Negotiation[];
}

export function NegotiationPipeline({
  data,
}: Props) {

  const approved =
    data.filter(
      (item) =>
        item.status ===
        "APPROVED"
    ).length;

  const percentage =
    data.length
      ? (
          approved /
          data.length
        ) * 100
      : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Approval Pipeline
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Progress
          value={
            percentage
          }
        />

        <p className="mt-3 text-sm">
          {percentage.toFixed(
            0
          )}
          % Approved
        </p>
      </CardContent>
    </Card>
  );
}