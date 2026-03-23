import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/page-header";
import {
    Plus,
    ShoppingCart,
    Coffee,
    Car,
    Zap,
    Gamepad2,
    GraduationCap,
    Heart,
    Home,
    Pencil,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
} from "lucide-react";

interface Category {
    id: number;
    name: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    spent: number;
    budget: number;
    transactionCount: number;
    trend: "up" | "down";
    trendValue: string;
}

const categories: Category[] = [
    {
        id: 1,
        name: "Food & Groceries",
        icon: ShoppingCart,
        color: "text-emerald-600 dark:text-emerald-400",
        bgColor: "bg-emerald-500/10",
        spent: 1800000,
        budget: 2500000,
        transactionCount: 24,
        trend: "up",
        trendValue: "+8%",
    },
    {
        id: 2,
        name: "Coffee & Drinks",
        icon: Coffee,
        color: "text-amber-600 dark:text-amber-400",
        bgColor: "bg-amber-500/10",
        spent: 380000,
        budget: 500000,
        transactionCount: 15,
        trend: "up",
        trendValue: "+15%",
    },
    {
        id: 3,
        name: "Transportation",
        icon: Car,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-500/10",
        spent: 650000,
        budget: 1000000,
        transactionCount: 18,
        trend: "down",
        trendValue: "-5%",
    },
    {
        id: 4,
        name: "Utilities",
        icon: Zap,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-500/10",
        spent: 750000,
        budget: 800000,
        transactionCount: 4,
        trend: "up",
        trendValue: "+3%",
    },
    {
        id: 5,
        name: "Entertainment",
        icon: Gamepad2,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-500/10",
        spent: 420000,
        budget: 500000,
        transactionCount: 8,
        trend: "down",
        trendValue: "-12%",
    },
    {
        id: 6,
        name: "Education",
        icon: GraduationCap,
        color: "text-cyan-600 dark:text-cyan-400",
        bgColor: "bg-cyan-500/10",
        spent: 150000,
        budget: 300000,
        transactionCount: 2,
        trend: "down",
        trendValue: "-20%",
    },
    {
        id: 7,
        name: "Healthcare",
        icon: Heart,
        color: "text-rose-600 dark:text-rose-400",
        bgColor: "bg-rose-500/10",
        spent: 120000,
        budget: 500000,
        transactionCount: 1,
        trend: "down",
        trendValue: "-60%",
    },
    {
        id: 8,
        name: "Housing",
        icon: Home,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-500/10",
        spent: 2500000,
        budget: 2500000,
        transactionCount: 1,
        trend: "up",
        trendValue: "0%",
    },
];

function formatRupiah(n: number) {
    return "Rp " + n.toLocaleString("id-ID");
}

function getStatusBadge(pct: number) {
    if (pct >= 100) {
        return (
            <Badge variant="destructive" className="gap-1 text-xs">
                <AlertTriangle className="size-3" />
                Over Budget
            </Badge>
        );
    }
    if (pct >= 80) {
        return (
            <Badge className="gap-1 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400 text-xs">
                <AlertTriangle className="size-3" />
                Near Limit
            </Badge>
        );
    }
    return (
        <Badge variant="secondary" className="text-xs">
            On Track
        </Badge>
    );
}

export default function Categories() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
    const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
    const totalPct = Math.round((totalSpent / totalBudget) * 100);

    return (
        <AppLayout>
            <Head title="Categories" />

            <PageHeader
                title="Categories"
                description="Manage your budget categories"
            >
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="size-4" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                            <DialogDescription>
                                Create a new budget category to organize
                                your expenses.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <small className="text-sm leading-none font-medium">
                                    Category Name
                                </small>
                                <Input placeholder="e.g. Subscriptions" />
                            </div>
                            <div className="space-y-2">
                                <small className="text-sm leading-none font-medium">
                                    Monthly Budget (Rp)
                                </small>
                                <Input type="number" placeholder="0" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setDialogOpen(false)}>
                                Create Category
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </PageHeader>

            <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
                {/* Overall Budget Summary */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Monthly Budget
                                </p>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    {formatRupiah(totalBudget)}
                                </h3>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                    Total Spent
                                </p>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    {formatRupiah(totalSpent)}
                                </h3>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <p className="text-sm text-muted-foreground">
                                    Overall Progress
                                </p>
                                <small className="text-sm leading-none font-medium">{totalPct}%</small>
                            </div>
                            <Progress value={totalPct} className="h-3" />
                            <p className="text-sm text-muted-foreground">
                                {formatRupiah(totalBudget - totalSpent)} remaining
                                this month
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                    {categories.map((category) => {
                        const pct = Math.round(
                            (category.spent / category.budget) * 100,
                        );
                        const remaining = category.budget - category.spent;

                        return (
                            <Card key={category.id} className="group relative overflow-hidden">
                                <CardContent className="pt-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex size-10 items-center justify-center rounded-lg ${category.bgColor} ${category.color}`}
                                            >
                                                <category.icon className="size-5" />
                                            </div>
                                            <div>
                                                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                                                    {category.name}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {category.transactionCount}{" "}
                                                    transactions
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(pct)}
                                            <Button
                                                variant="ghost"
                                                size="icon-xs"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Pencil className="size-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <small className="text-sm leading-none font-medium">
                                                {formatRupiah(category.spent)}
                                            </small>
                                            <p className="text-sm text-muted-foreground">
                                                {formatRupiah(category.budget)}
                                            </p>
                                        </div>
                                        <Progress
                                            value={Math.min(pct, 100)}
                                            className="h-2"
                                        />
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">
                                            {remaining >= 0
                                                ? `${formatRupiah(remaining)} left`
                                                : `${formatRupiah(Math.abs(remaining))} over`}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs">
                                            {category.trend === "up" ? (
                                                <TrendingUp className="size-3 text-rose-500" />
                                            ) : (
                                                <TrendingDown className="size-3 text-emerald-500" />
                                            )}
                                            <span
                                                className={
                                                    category.trend === "up"
                                                        ? "text-rose-500"
                                                        : "text-emerald-500"
                                                }
                                            >
                                                {category.trendValue}
                                            </span>
                                            <span className="text-muted-foreground">
                                                vs last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
