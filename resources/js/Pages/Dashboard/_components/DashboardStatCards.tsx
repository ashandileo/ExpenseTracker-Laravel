import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import {
    DollarSign,
    CalendarDays,
    PiggyBank,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingCart,
} from "lucide-react";

const stats = [
    {
        title: "Total This Month",
        value: "Rp 4.250.000",
        change: "+12.5%",
        trend: "up" as const,
        icon: DollarSign,
        description: "vs last month",
    },
    {
        title: "Daily Average",
        value: "Rp 185.000",
        change: "-3.2%",
        trend: "down" as const,
        icon: CalendarDays,
        description: "vs last month",
    },
    {
        title: "Budget Remaining",
        value: "Rp 1.750.000",
        change: "29%",
        trend: "down" as const,
        icon: PiggyBank,
        description: "of Rp 6.000.000",
    },
    {
        title: "Total Categories",
        value: "8",
        change: "+2",
        trend: "up" as const,
        icon: ShoppingCart,
        description: "active categories",
    },
];

export function DashboardStatCards() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardDescription className="text-sm font-medium">
                            {stat.title}
                        </CardDescription>
                        <div className="rounded-md bg-muted p-2">
                            <stat.icon className="size-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-semibold">
                            {stat.value}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs">
                            {stat.trend === "up" ? (
                                <ArrowUpRight className="size-3 text-emerald-500" />
                            ) : (
                                <ArrowDownRight className="size-3 text-rose-500" />
                            )}
                            <span
                                className={
                                    stat.trend === "up"
                                        ? "text-emerald-500"
                                        : "text-rose-500"
                                }
                            >
                                {stat.change}
                            </span>
                            <span className="text-muted-foreground">
                                {stat.description}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
