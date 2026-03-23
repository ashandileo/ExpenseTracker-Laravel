import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExpenseForm } from "../forms/ExpenseForm";
import type { ExpenseFormValues } from "../forms/schema";
import { Expense } from "../../types";

interface ExpenseEditDialogProps {
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExpenseEditDialog({
  expense,
  open,
  onOpenChange,
}: ExpenseEditDialogProps) {
  function handleSubmit(values: ExpenseFormValues) {
    console.log("Edit expense:", expense?.id, values);
    // TODO: implement actual update logic
    onOpenChange(false);
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
          defaultValues={{
            description: expense.description,
            amount: expense.rawAmount,
            category: expense.category,
            date: expense.date,
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
