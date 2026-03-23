import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/page-header";
import {
    DollarSign,
    CalendarDays,
    PiggyBank,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingCart,
    Coffee,
    Car,
    Zap,
    UtensilsCrossed,
    Gamepad2,
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

const recentExpenses = [
    {
        id: 1,
        description: "Grocery Shopping",
        category: "Food & Groceries",
        amount: "Rp 350.000",
        date: "Today",
        icon: ShoppingCart,
        color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
        id: 2,
        description: "Morning Coffee",
        category: "Coffee & Drinks",
        amount: "Rp 45.000",
        date: "Today",
        icon: Coffee,
        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
        id: 3,
        description: "Grab to Office",
        category: "Transportation",
        amount: "Rp 65.000",
        date: "Yesterday",
        icon: Car,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: 4,
        description: "Electricity Bill",
        category: "Utilities",
        amount: "Rp 450.000",
        date: "Yesterday",
        icon: Zap,
        color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    },
    {
        id: 5,
        description: "Dinner with Friends",
        category: "Food & Groceries",
        amount: "Rp 280.000",
        date: "Mar 21",
        icon: UtensilsCrossed,
        color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        id: 6,
        description: "Netflix Subscription",
        category: "Entertainment",
        amount: "Rp 186.000",
        date: "Mar 20",
        icon: Gamepad2,
        color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
];

const budgetOverview = [
    {
        category: "Food & Groceries",
        spent: 1800000,
        budget: 2500000,
        color: "bg-emerald-500",
    },
    {
        category: "Transportation",
        spent: 650000,
        budget: 1000000,
        color: "bg-blue-500",
    },
    {
        category: "Entertainment",
        spent: 420000,
        budget: 500000,
        color: "bg-purple-500",
    },
    {
        category: "Utilities",
        spent: 750000,
        budget: 800000,
        color: "bg-yellow-500",
    },
];

function formatRupiah(n: number) {
    return "Rp " + n.toLocaleString("id-ID");
}

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <PageHeader
                title="Dashboard"
                description="Overview of your expenses this month"
            />
            <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
                {/* Stat Cards */}
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

                <div className="grid gap-6 lg:grid-cols-5">
                    {/* Recent Expenses */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Expenses</CardTitle>
                            <CardDescription>
                                Your latest spending activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                {recentExpenses.map((expense, i) => (
                                    <div key={expense.id}>
                                        <div className="flex items-center gap-3 py-3">
                                            <div
                                                className={`flex size-9 items-center justify-center rounded-lg ${expense.color}`}
                                            >
                                                <expense.icon className="size-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <small className="text-sm leading-none font-medium truncate block">
                                                    {expense.description}
                                                </small>
                                                <p className="text-sm text-muted-foreground">
                                                    {expense.category}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <small className="text-sm leading-none font-medium">
                                                    -{expense.amount}
                                                </small>
                                                <p className="text-sm text-muted-foreground">
                                                    {expense.date}
                                                </p>
                                            </div>
                                        </div>
                                        {i < recentExpenses.length - 1 && (
                                            <Separator />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Budget Overview */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Budget Overview</CardTitle>
                            <CardDescription>
                                Monthly budget progress
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {budgetOverview.map((item) => {
                                const pct = Math.round(
                                    (item.spent / item.budget) * 100,
                                );
                                return (
                                    <div
                                        key={item.category}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <small className="text-sm leading-none font-medium">
                                                {item.category}
                                            </small>
                                            <p className="text-sm text-muted-foreground">
                                                {pct}%
                                            </p>
                                        </div>
                                        <Progress value={pct} className="h-2" />
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">
                                                {formatRupiah(item.spent)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatRupiah(item.budget)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
