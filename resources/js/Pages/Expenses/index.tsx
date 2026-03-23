import { Head } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { PageHeader } from "@/components/page-header";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useActions } from "@/hooks/use-actions";
import { allExpenses } from "./constants";
import { ExpenseFilters } from "./_components/ExpenseFilters";
import { ExpenseList } from "./_components/ExpenseList";
import { ExpenseAddDialog } from "./_components/ExpenseAddDialog";
import { ExpenseEditDialog } from "./_components/ExpenseEditDialog";
import { Expense } from "./types";

enum Actions {
    ExpenseAdd = "expense-add",
    ExpenseEdit = "expense-edit",
    ExpenseDelete = "expense-delete",
}

export default function Expenses() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const { action, isAction, setAction, clearAction } = useActions<Actions>();

    const filtered = allExpenses.filter((e) => {
        const matchSearch =
            e.description.toLowerCase().includes(search.toLowerCase()) ||
            e.category.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            categoryFilter === "all" || e.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    const totalFiltered = filtered.reduce((sum, e) => sum + e.rawAmount, 0);

    function handleDeleteConfirm() {
        // TODO: implement actual delete logic
        clearAction();
    }

    return (
        <AppLayout>
            <Head title="Expenses" />

            <PageHeader
                title="Expenses"
                description="Track and manage your spending"
            >
                <ExpenseAddDialog
                    open={isAction(Actions.ExpenseAdd)}
                    onOpenChange={(open) =>
                        open ? setAction(Actions.ExpenseAdd) : clearAction()
                    }
                />
            </PageHeader>

            <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
                <ExpenseFilters
                    search={search}
                    onSearchChange={setSearch}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                />

                {/* Summary Bar */}
                <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
                    <p className="text-sm text-muted-foreground">
                        {filtered.length} expense
                        {filtered.length !== 1 ? "s" : ""}
                    </p>
                    <small className="text-sm leading-none font-medium">
                        Total: Rp {totalFiltered.toLocaleString("id-ID")}
                    </small>
                </div>

                <ExpenseList
                    expenses={filtered}
                    onEdit={(expense) =>
                        setAction(Actions.ExpenseEdit, expense)
                    }
                    onDelete={(expense) =>
                        setAction(Actions.ExpenseDelete, expense)
                    }
                />
            </div>

            <ExpenseEditDialog
                expense={(action?.params as Expense) ?? null}
                open={isAction(Actions.ExpenseEdit)}
                onOpenChange={(open) => !open && clearAction()}
            />

            <ConfirmationDialog
                open={isAction(Actions.ExpenseDelete)}
                onOpenChange={(open) => !open && clearAction()}
                title="Delete Expense"
                description={`Are you sure you want to delete "${(action?.params as Expense)?.description}"? This action cannot be undone.`}
                confirmLabel="Delete"
                onConfirm={handleDeleteConfirm}
            />
        </AppLayout>
    );
}
