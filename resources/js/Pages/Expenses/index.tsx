import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import AppLayout from "@/Layouts/AppLayout";
import { PageHeader } from "@/components/page-header";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useActions } from "@/hooks/use-actions";
import { formatRupiah } from "./constants";
import { ExpenseFilters } from "./_components/ExpenseFilters";
import { ExpenseList } from "./_components/ExpenseList";
import { ExpenseAddDialog } from "./_components/dialogs/ExpenseAddDialog";
import { ExpenseEditDialog } from "./_components/dialogs/ExpenseEditDialog";
import { Expense, ExpenseCategory } from "./types";

enum Actions {
  ExpenseAdd = "expense-add",
  ExpenseEdit = "expense-edit",
  ExpenseDelete = "expense-delete",
}

interface ExpensesProps {
  expenses: Expense[];
  categories: ExpenseCategory[];
}

export default function Expenses({ expenses, categories }: ExpensesProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { action, isAction, setAction, clearAction } = useActions<Actions>();

  const filtered = expenses.filter((e) => {
    const matchSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      (e.category?.name ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "all" || String(e.category_id) === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalFiltered = filtered.reduce((sum, e) => sum + e.amount, 0);

  function handleDeleteConfirm() {
    const expense = action?.params as Expense;
    if (!expense) return;

    router.delete(`/expenses/${expense.id}`, {
      onSuccess: () => {
        clearAction();
        toast.success("Expense deleted successfully");
      },
    });
  }

  return (
    <AppLayout>
      <Head title="Expenses" />

      <PageHeader title="Expenses" description="Track and manage your spending">
        <ExpenseAddDialog
          categories={categories}
          open={isAction(Actions.ExpenseAdd)}
          onOpenChange={(open) =>
            open ? setAction(Actions.ExpenseAdd) : clearAction()
          }
        />
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
        <ExpenseFilters
          categories={categories}
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
            Total: {formatRupiah(totalFiltered)}
          </small>
        </div>

        <ExpenseList
          expenses={filtered}
          onEdit={(expense) => setAction(Actions.ExpenseEdit, expense)}
          onDelete={(expense) => setAction(Actions.ExpenseDelete, expense)}
        />
      </div>

      <ExpenseEditDialog
        categories={categories}
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
