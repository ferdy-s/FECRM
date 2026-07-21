"use client";

import {
    RefreshCcw,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type NotificationFilterValue =
    | "ALL"
    | "UNREAD"
    | "READ";

interface NotificationToolbarProps {

    search: string;

    filter: NotificationFilterValue;

    total: number;

    isRefreshing: boolean;

    onSearchChange: (
        value: string,
    ) => void;

    onFilterChange: (
        value: NotificationFilterValue,
    ) => void;

    onRefresh: () => void;

}

export function NotificationToolbar({

    search,

    filter,

    total,

    isRefreshing,

    onSearchChange,

    onFilterChange,

    onRefresh,

}: NotificationToolbarProps) {

    return (

        <div
            className="
                flex
                flex-col
                gap-4
                xl:flex-row
                xl:items-center
                xl:justify-between
            "
        >

            {/* Left */}

            <div
                className="
                    flex
                    flex-1
                    flex-col
                    gap-4
                    lg:flex-row
                    lg:items-center
                "
            >

                {/* Search */}

                <div
                    className="
                        relative
                        w-full
                        lg:max-w-md
                    "
                >

                    <Search
                        className="
                            absolute
                            left-3
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-muted-foreground
                        "
                    />

                    <Input
                        value={search}
                        onChange={(event) =>
                            onSearchChange(
                                event.target.value
                            )
                        }
                        placeholder="Search notifications..."
                        className="pl-10"
                    />

                </div>

                {/* Filter */}

                <Select
                    value={filter}
                    onValueChange={(value) =>
                        onFilterChange(
                            value as NotificationFilterValue
                        )
                    }
                >

                    <SelectTrigger
                        className="
                            w-full
                            sm:w-52
                        "
                    >

                        <SelectValue />

                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="ALL">
                            All Notifications
                        </SelectItem>

                        <SelectItem value="UNREAD">
                            Unread
                        </SelectItem>

                        <SelectItem value="READ">
                            Read
                        </SelectItem>

                    </SelectContent>

                </Select>

            </div>

            {/* Right */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                <p
                    className="
                        text-sm
                        text-muted-foreground
                    "
                >

                    <span
                        className="
                            font-semibold
                            text-foreground
                        "
                    >

                        {total}

                    </span>

                    {" "}
                    Result{total !== 1 && "s"}

                </p>

                <Button
                    variant="outline"
                    onClick={onRefresh}
                    disabled={isRefreshing}
                >

                    <RefreshCcw
                        className={`
                            mr-2
                            h-4
                            w-4
                            ${
                                isRefreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        `}
                    />

                    Refresh

                </Button>

            </div>

        </div>

    );

}