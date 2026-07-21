import {
  Badge
} from "@/components/ui/badge";

import {
  Progress
} from "@/components/ui/progress";

const stages = [
  {
    name: "New Leads",
    value: 25,
    progress: 100,
  },

  {
    name: "Qualified",
    value: 12,
    progress: 48,
  },

  {
    name: "Proposal",
    value: 8,
    progress: 32,
  },

  {
    name: "Negotiation",
    value: 5,
    progress: 20,
  },

  {
    name: "Won",
    value: 2,
    progress: 8,
  },
];

export function PipelineSummary() {
  return (
    <div
      className="
        mb-6
        grid
        gap-3
      "
    >
      {stages.map((stage) => (
        <div
          key={stage.name}
          className="
            flex
            items-center
            gap-4
          "
        >
          <div className="w-32">
            <Badge
              variant="secondary"
            >
              {stage.name}
            </Badge>
          </div>

          <Progress
            value={stage.progress}
            className="flex-1"
          />

          <span
            className="
              w-8
              text-right
              text-sm
              font-medium
            "
          >
            {stage.value}
          </span>
        </div>
      ))}
    </div>
  );
}