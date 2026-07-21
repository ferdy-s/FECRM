import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { LucideIcon } from "lucide-react";

interface KPIStatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
}

export function KPIStatCard({
    title,
    value,
    description,
    icon: Icon,
}: KPIStatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>

                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                <div className="text-3xl font-bold">
                    {value}
                </div>

                {description && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}