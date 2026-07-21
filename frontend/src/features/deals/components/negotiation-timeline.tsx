import {
  CircleDollarSign,
} from "lucide-react";

import {
  negotiations,
} from "../constants/negotiations.mock";

export function NegotiationTimeline() {
  return (
    <div className="space-y-4">
      {negotiations.map(
        (item) => (
          <div
            key={item.id}
            className="
              flex
              gap-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
              "
            >
              <CircleDollarSign
                className="h-4 w-4"
              />
            </div>

            <div>
              <h4 className="font-medium">
                Offer #
                {item.offerNumber}
              </h4>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >
                {item.note}
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                "
              >
                Rp{" "}
                {item.amount.toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}