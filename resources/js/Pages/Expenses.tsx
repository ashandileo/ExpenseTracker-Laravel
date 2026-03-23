import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";
import {
    Plus,
    Search,
    Filter,
    ShoppingCart,
    Coffee,
    Car,
    Zap,
    UtensilsCrossed,
    Gamepad2,
    GraduationCap,
    Heart,
    Home,
    MoreVertical,
    Calendar,
    Trash2,
    Pencil,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Expense {
    id: number;
    description: string;
    category: string;
    amount: string;
    rawAmount: number;
    date: string;
    note?: string;
    icon: React.ElementType;
    color: string;
}

const categoryIcons: Record<string, { icon: React.ElementType; color: string }> = {
    "Food & Groceries": { icon: ShoppingCart, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    "Coffee & Drinks": { icon: Coffee, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    "Transportation": { icon: Car, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    "Utilities": { icon: Zap, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
    "Entertainment": { icon: Gamepad2, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    "Education": { icon: GraduationCap, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
    "Healthcare": { icon: Heart, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
    "Housing": { icon: Home, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
};

const allExpenses: Expense[] = [
    { id: 1, description: "Grocery Shopping", category: "Food & Groceries", amount: "Rp 350.000", rawAmount: 350000, date: "2026-03-23", icon: ShoppingCart, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { id: 2, description: "Morning Coffee", category: "Coffee & Drinks", amount: "Rp 45.000", rawAmount: 45000, date: "2026-03-23", icon: Coffee, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    { id: 3, description: "Grab to Office", category: "Transportation", amount: "Rp 65.000", rawAmount: 65000, date: "2026-03-22", icon: Car, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { id: 4, description: "Electricity Bill", category: "Utilities", amount: "Rp 450.000", rawAmount: 450000, date: "2026-03-22", icon: Zap, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
    { id: 5, description: "Dinner with Friends", category: "Food & Groceries", amount: "Rp 280.000", rawAmount: 280000, date: "2026-03-21", icon: UtensilsCrossed, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
    { id: 6, description: "Netflix Subscription", category: "Entertainment", amount: "Rp 186.000", rawAmount: 186000, date: "2026-03-20", icon: Gamepad2, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    { id: 7, description: "Udemy Course", category: "Education", amount: "Rp 150.000", rawAmount: 150000, date: "2026-03-19", icon: GraduationCap, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
    { id: 8, description: "Gas Station", category: "Transportation", amount: "Rp 200.000", rawAmount: 200000, date: "2026-03-18", icon: Car, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { id: 9, description: "Water Bill", category: "Utilities", amount: "Rp 150.000", rawAmount: 150000, date: "2026-03-17", icon: Zap, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
    { id: 10, description: "Lunch - Padang", category: "Food & Groceries", amount: "Rp 35.000", rawAmount: 35000, date: "2026-03-17", icon: UtensilsCrossed, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { id: 11, description: "Spotify Premium", category: "Entertainment", amount: "Rp 55.000", rawAmount: 55000, date: "2026-03-15", icon: Gamepad2, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    { id: 12, description: "Vitamin Supplements", category: "Healthcare", amount: "Rp 120.000", rawAmount: 120000, date: "2026-03-14", icon: Heart, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
];

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Expenses() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [dialogOpen, setDialogOpen] = useState(false);

    const categories = Object.keys(categoryIcons);

    const filtered = allExpenses.filter((e) => {
        const matchSearch =
            e.description.toLowerCase().includes(search.toLowerCase()) ||
            e.category.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            categoryFilter === "all" || e.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    const totalFiltered = filtered.reduce((sum, e) => sum + e.rawAmount, 0);

    // Group by date
    const grouped = filtered.reduce<Record<string, Expense[]>>((acc, e) => {
        const key = e.date;
        if (!acc[key]) acc[key] = [];
        acc[key].push(e);
        return acc;
    }, {});

    const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    return (
        <AppLayout>
            <Head title="Expenses" />

            <PageHeader
                title="Expenses"
                description="Track and manage your spending"
            >
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="size-4" />
                            Add Expense
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add New Expense</DialogTitle>
                            <DialogDescription>
                                Record a new expense to track your spending.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <small className="text-sm leading-none font-medium">
                                    Description
                                </small>
                                <Input placeholder="e.g. Grocery shopping" />
                            </div>
                            <div className="space-y-2">
                                <small className="text-sm leading-none font-medium">
                                    Amount (Rp)
                                </small>
                                <Input
                                    type="number"
                                    placeholder="0"
                                />
                            </div>
                            <div className="space-y-2">
                                <small className="text-sm leading-none font-medium">
                                    Category
                                </small>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem
                                                key={cat}
                                                value={cat}
                                            >
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <small className="text-sm leading-none font-medium">
                                    Date
                                </small>
                                <Input type="date" defaultValue="2026-03-23" />
                            </div>
                            <div className="space-y-2">
                                <small className="text-sm leading-none font-medium">
                                    Note{" "}
                                    <span className="text-muted-foreground font-normal">
                                        (optional)
                                    </span>
                                </small>
                                <Textarea
                                    placeholder="Add a note..."
                                    rows={2}
                                />
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
                                Save Expense
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </PageHeader>

            <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
                {/* Filters */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search expenses..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                    >
                        <SelectTrigger className="sm:w-48">
                            <Filter className="size-4 mr-2 text-muted-foreground" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Summary Bar */}
                <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                        {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
                    </p>
                    <small className="text-sm leading-none font-medium">
                        Total: Rp {totalFiltered.toLocaleString("id-ID")}
                    </small>
                </div>

                {/* Expense List */}
                <div className="space-y-6">
                    {sortedDates.map((date) => (
                        <div key={date}>
                            <div className="mb-3 flex items-center gap-2">
                                <Calendar className="size-3.5 text-muted-foreground" />
                                <small className="text-sm leading-none font-medium text-muted-foreground">
                                    {formatDate(date)}
                                </small>
                            </div>
                            <Card>
                                <CardContent className="p-0">
                                    {grouped[date].map((expense, i) => (
                                        <div key={expense.id}>
                                            <div className="flex items-center gap-3 px-4 py-3">
                                                <div
                                                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${expense.color}`}
                                                >
                                                    <expense.icon className="size-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <small className="text-sm leading-none font-medium truncate block">
                                                        {expense.description}
                                                    </small>
                                                    <Badge
                                                        variant="secondary"
                                                        className="mt-0.5 text-xs font-normal"
                                                    >
                                                        {expense.category}
                                                    </Badge>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <small className="text-sm leading-none font-medium">
                                                        -{expense.amount}
                                                    </small>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon-xs"
                                                        >
                                                            <MoreVertical className="size-3.5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Pencil className="size-3.5" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">
                                                            <Trash2 className="size-3.5" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            {i < grouped[date].length - 1 && (
                                                <Separator />
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="rounded-full bg-muted p-4 mb-4">
                            <Search className="size-6 text-muted-foreground" />
                        </div>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">No expenses found</h4>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
