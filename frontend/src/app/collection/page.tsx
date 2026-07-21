"use client";

import { DashboardLayout }
from "@/components/layout/dashboard-layout";

import { CollectionKPI }
from "@/features/collection/components/collection-kpi";

import { CollectionAging }
from "@/features/collection/components/collection-aging";

import { CollectionRevenue }
from "@/features/collection/components/collection-revenue";

import { CollectionTable }
from "@/features/collection/components/collection-table";

import { useCollections }
from "@/hooks/use-collections";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button }
from "@/components/ui/button";

export default function CollectionPage() {

  const {

    data: collections = [],

    isLoading,

    isError,

    refetch,

  } = useCollections();

  ////////////////////////////////////////////////////////////

  if (isError) {

    return (

      <DashboardLayout>

        <Card>

          <CardContent className="flex h-72 flex-col items-center justify-center gap-4">

            <h2 className="text-xl font-semibold">

              Failed to load collection data

            </h2>

            <Button
              onClick={() => refetch()}
            >
              Retry
            </Button>

          </CardContent>

        </Card>

      </DashboardLayout>

    );

  }

  ////////////////////////////////////////////////////////////

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">

            Collection Center

          </h1>

          <p className="text-muted-foreground">

            Monitor outstanding invoices and collection performance.

          </p>

        </div>

        <CollectionKPI
          collections={collections}
        />

        <CollectionAging
          collections={collections}
        />

        <CollectionRevenue
          collections={collections}
        />

        <CollectionTable

          collections={collections}

          isLoading={isLoading}

        />

      </div>

    </DashboardLayout>

  );

}