import {
  Trophy,
  Medal,
  Award,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Progress,
} from "@/components/ui/progress";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const sales = [
  {
    name: "Ferdy",
    leads: 54,
    wonDeals: 12,
    winRate: 22,
  },

  {
    name: "Budi",
    leads: 48,
    wonDeals: 10,
    winRate: 20,
  },

  {
    name: "Andi",
    leads: 41,
    wonDeals: 8,
    winRate: 19,
  },

  {
    name: "Siti",
    leads: 32,
    wonDeals: 6,
    winRate: 18,
  },

  {
    name: "Rina",
    leads: 28,
    wonDeals: 4,
    winRate: 14,
  },
];

function RankingIcon({
  index,
}: {
  index: number;
}) {
  if (index === 0) {
    return (
      <Trophy className="h-4 w-4 text-yellow-500" />
    );
  }

  if (index === 1) {
    return (
      <Medal className="h-4 w-4 text-slate-500" />
    );
  }

  if (index === 2) {
    return (
      <Award className="h-4 w-4 text-orange-500" />
    );
  }

  return (
    <span
      className="
        text-xs
        font-semibold
        text-muted-foreground
      "
    >
      #{index + 1}
    </span>
  );
}

export function TopPerformance() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          Top Sales Performance
        </CardTitle>

        <CardDescription>
          Ranking berdasarkan leads dan won deals
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[340px]">
          <div className="space-y-4 p-6 pt-0">
            {sales.map((item, index) => (
              <div
                key={item.name}
                className="
                  rounded-xl
                  border
                  p-4
                  transition-all
                  hover:bg-muted/40
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                      "
                    >
                      <RankingIcon
                        index={index}
                      />
                    </div>

                    <Avatar>
                      <AvatarFallback>
                        {item.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        {item.leads} Leads •{" "}
                        {item.wonDeals} Won
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className="
                        text-lg
                        font-bold
                      "
                    >
                      {item.winRate}%
                    </p>

                    <p
                      className="
                        text-xs
                        text-muted-foreground
                      "
                    >
                      Win Rate
                    </p>
                  </div>
                </div>

                <Progress
                  value={item.winRate}
                  className="mt-4"
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}