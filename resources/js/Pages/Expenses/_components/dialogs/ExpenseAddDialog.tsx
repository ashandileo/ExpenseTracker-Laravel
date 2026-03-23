import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ExpenseForm } from "../forms/ExpenseForm";
import type { ExpenseFormValues } from "../forms/schema";

interface ExpenseAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExpenseAddDialog({ open, onOpenChange }: ExpenseAddDialogProps) {
  function handleSubmit(values: ExpenseFormValues) {
    console.log("Add expense:", values);
    // TODO: implement actual create logic
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <ExpenseForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Save Expense"
        />
      </DialogContent>
    </Dialog>
  );
}
