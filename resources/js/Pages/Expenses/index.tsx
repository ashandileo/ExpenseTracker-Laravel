import { Head } from "@inertiajs/react";
import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { PageHeader } from "@/components/page-header";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { allExpenses } from "./constants";
import { ExpenseFilters } from "./_components/ExpenseFilters";
import { ExpenseList } from "./_components/ExpenseList";
import { ExpenseAddDialog } from "./_components/ExpenseAddDialog";
import { ExpenseEditDialog } from "./_components/ExpenseEditDialog";
import { Expense } from "./types";

export default function Expenses() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [dialogOpen, setDialogOpen] = useState(false);

    const [editExpense, setEditExpense] = useState<Expense | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const filtered = allExpenses.filter((e) => {
        const matchSearch =
            e.description.toLowerCase().includes(search.toLowerCase()) ||
            e.category.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            categoryFilter === "all" || e.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    const totalFiltered = filtered.reduce((sum, e) => sum + e.rawAmount, 0);

    function handleEdit(expense: Expense) {
        setEditExpense(expense);
        setEditDialogOpen(true);
    }

    function handleDelete(expense: Expense) {
        setDeleteExpense(expense);
        setDeleteDialogOpen(true);
    }

    function handleDeleteConfirm() {
        // TODO: implement actual delete logic
        setDeleteExpense(null);
    }

    return (
        <AppLayout>
            <Head title="Expenses" />

            <PageHeader
                title="Expenses"
                description="Track and manage your spending"
            >
                <ExpenseAddDialog open={dialogOpen} onOpenChange={setDialogOpen} />
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
                        {filtered.length} expense{filtered.length !== 1 ? "s" : ""}
                    </p>
                    <small className="text-sm leading-none font-medium">
                        Total: Rp {totalFiltered.toLocaleString("id-ID")}
                    </small>
                </div>

                <ExpenseList
                    expenses={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            <ExpenseEditDialog
                expense={editExpense}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
            />

            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Expense"
                description={`Are you sure you want to delete "${deleteExpense?.description}"? This action cannot be undone.`}
                confirmLabel="Delete"
                onConfirm={handleDeleteConfirm}
            />
        </AppLayout>
    );
}
