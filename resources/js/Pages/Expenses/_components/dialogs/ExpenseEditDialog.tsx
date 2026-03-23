import { router } from "@inertiajs/react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExpenseForm } from "../forms/ExpenseForm";
import type { ExpenseFormValues } from "../forms/schema";
import { Expense, ExpenseCategory } from "../../types";

interface ExpenseEditDialogProps {
  categories: ExpenseCategory[];
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExpenseEditDialog({
  categories,
  expense,
  open,
  onOpenChange,
}: ExpenseEditDialogProps) {
  function handleSubmit(values: ExpenseFormValues) {
    if (!expense) return;
    router.put(`/expenses/${expense.id}`, values, {
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Expense updated successfully");
      },
    });
  }

  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Update the details of this expense.
          </DialogDescription>
        </DialogHeader>
        <ExpenseForm
          key={expense.id}
          categories={categories}
          defaultValues={{
            description: expense.description,
            amount: expense.amount,
            category_id: expense.category_id,
            date: expense.date.split("T")[0],
            note: expense.note ?? "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
