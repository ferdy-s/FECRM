import {
  TrendingUp,
  Wallet,
  Receipt,
} from "lucide-react";

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
  ScrollArea,
} from "@/components/ui/scroll-area";

interface Props {
  pipelineValue: number;
  collected: number;
  outstanding: number;
}

export function RevenueOverview({
  pipelineValue,
  collected,
  outstanding,
}: Props) {

  const targetRevenue =
    pipelineValue > 0
      ? pipelineValue
      : 1;

  const achievedRevenue =
    collected;

  const progress =
    Math.min(
      (achievedRevenue /
        targetRevenue) *
        100,
      100
    );

  return (
    <Card className="h-full">

      <CardHeader>
        <CardTitle>
          Revenue Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">

        <ScrollArea className="h-[490px]">

          <div className="space-y-6 px-6 pb-6">

            {/* TARGET */}

            <div>
              <p className="text-sm text-muted-foreground">
                Pipeline Value
              </p>

              <h2
                className="
                  mt-1
                  text-3xl
                  font-bold
                  tracking-tight
                "
              >
                Rp{" "}
                {targetRevenue.toLocaleString(
                  "id-ID"
                )}
              </h2>
            </div>

            {/* ACHIEVED */}

            <div>
              <p className="text-sm text-muted-foreground">
                Collected Revenue
              </p>

              <h3
                className="
                  mt-1
                  text-2xl
                  font-semibold
                "
              >
                Rp{" "}
                {achievedRevenue.toLocaleString(
                  "id-ID"
                )}
              </h3>
            </div>

            {/* PROGRESS */}

            <div className="space-y-3">

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Collection Progress
                </span>

                <span
                  className="
                    font-semibold
                  "
                >
                  {progress.toFixed(1)}%
                </span>
              </div>

              <Progress
                value={progress}
                className="h-3"
              />

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-green-600
                "
              >
                <TrendingUp className="h-4 w-4" />

                Current Collection Performance
              </div>

            </div>

            {/* KPI */}

            <div className="grid gap-3">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >
                <div>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Outstanding Revenue
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-semibold
                    "
                  >
                    Rp{" "}
                    {outstanding.toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </div>

                <Receipt
                  className="
                    h-8
                    w-8
                    text-muted-foreground
                  "
                />

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  p-4
                "
              >
                <div>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >
                    Collected Revenue
                  </p>

                  <p
                    className="
                      mt-1
                      text-lg
                      font-semibold
                    "
                  >
                    Rp{" "}
                    {collected.toLocaleString(
                      "id-ID"
                    )}
                  </p>

                </div>

                <Wallet
                  className="
                    h-8
                    w-8
                    text-muted-foreground
                  "
                />

              </div>

            </div>

            {/* SUMMARY */}

            <div
              className="
                rounded-xl
                bg-muted/40
                p-4
              "
            >

              <p className="text-sm text-muted-foreground">
                Revenue Summary
              </p>

              <p className="mt-2 text-sm">
                Revenue telah mencapai{" "}
                <span className="font-semibold">
                  {progress.toFixed(1)}%
                </span>{" "}
                dari total pipeline dengan
                outstanding sebesar{" "}
                <span className="font-semibold">
                  Rp{" "}
                  {outstanding.toLocaleString(
                    "id-ID"
                  )}
                </span>
                .
              </p>

            </div>

          </div>

        </ScrollArea>

      </CardContent>

    </Card>
  );
}
