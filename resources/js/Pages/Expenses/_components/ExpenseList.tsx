import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Calendar,
    MoreVertical,
    Pencil,
    Trash2,
    Search,
} from "lucide-react";
import { Expense } from "../types";

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface ExpenseListProps {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
    const grouped = expenses.reduce<Record<string, Expense[]>>((acc, e) => {
        const key = e.date;
        if (!acc[key]) acc[key] = [];
        acc[key].push(e);
        return acc;
    }, {});

    const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    if (expenses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                    <Search className="size-6 text-muted-foreground" />
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">No expenses found</h4>
                <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                </p>
            </div>
        );
    }

    return (
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
                                                <DropdownMenuItem onClick={() => onEdit(expense)}>
                                                    <Pencil className="size-3.5" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => onDelete(expense)}>
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
    );
}
