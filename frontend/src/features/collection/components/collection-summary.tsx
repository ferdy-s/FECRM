import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  totalRevenue: number;
  collectedRevenue: number;
  outstandingRevenue: number;
  collectionRate: number;
}

export function CollectionSummary({
  totalRevenue,
  collectedRevenue,
  outstandingRevenue,
  collectionRate,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <Card>
        <CardHeader>
          <CardTitle>
            Total Revenue
          </CardTitle>
        </CardHeader>

        <CardContent>
          Rp {totalRevenue.toLocaleString("id-ID")}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Collected
          </CardTitle>
        </CardHeader>

        <CardContent>
          Rp {collectedRevenue.toLocaleString("id-ID")}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Outstanding
          </CardTitle>
        </CardHeader>

        <CardContent>
          Rp {outstandingRevenue.toLocaleString("id-ID")}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Collection Rate
          </CardTitle>
        </CardHeader>

        <CardContent>
          {collectionRate.toFixed(2)}%
        </CardContent>
      </Card>

    </div>
  );
}