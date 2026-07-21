"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ReportErrorProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export function ReportError({
    title = "Failed to load report",
    description = "Something went wrong while loading reporting data.",
    onRetry,
}: ReportErrorProps) {

    return (

        <div
            className="
                flex
                min-h-[220px]
                items-center
                justify-center
                rounded-xl
                border
            "
        >

            <div className="text-center">

                <AlertTriangle
                    className="
                        mx-auto
                        mb-4
                        h-10
                        w-10
                        text-destructive
                    "
                />

                <h3
                    className="
                        text-lg
                        font-semibold
                    "
                >
                    {title}
                </h3>

                <p
                    className="
                        mt-2
                        text-sm
                        text-muted-foreground
                    "
                >
                    {description}
                </p>

                {onRetry && (

                    <Button
                        className="mt-6"
                        onClick={onRetry}
                    >
                        Retry
                    </Button>

                )}

            </div>

        </div>

    );

}