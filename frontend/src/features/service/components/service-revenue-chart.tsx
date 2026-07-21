"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useServices } from "@/hooks/use-service-management";

export function ServiceRevenueChart() {
  const { data = [] } = useServices();

  const chartData = data.map((service) => ({
    name: service.name,
    price: Number(service.price),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Service Price Distribution
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={chartData}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="price" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}