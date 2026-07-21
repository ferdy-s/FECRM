"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface ReportSkeletonProps {
    cards?: number;
}

export function ReportSkeleton({
    cards = 4,
}: ReportSkeletonProps) {

    return (

        <div
            className="
                grid
                gap-4
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
            "
        >

            {Array.from({
                length: cards,
            }).map((_, index) => (

                <div
                    key={index}
                    className="
                        rounded-xl
                        border
                        p-6
                        space-y-4
                    "
                >

                    <Skeleton className="h-4 w-28" />

                    <Skeleton className="h-10 w-36" />

                    <Skeleton className="h-3 w-24" />

                </div>

            ))}

        </div>

    );

}