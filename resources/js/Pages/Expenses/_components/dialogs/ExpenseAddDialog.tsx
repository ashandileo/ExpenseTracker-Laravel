import { router } from "@inertiajs/react";
import { toast } from "sonner";
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
import { ExpenseCategory } from "../../types";

interface ExpenseAddDialogProps {
  categories: ExpenseCategory[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExpenseAddDialog({
  categories,
  open,
  onOpenChange,
}: ExpenseAddDialogProps) {
  function handleSubmit(values: ExpenseFormValues) {
    router.post("/expenses", values, {
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Expense added successfully");
      },
    });
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
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Save Expense"
        />
      </DialogContent>
    </Dialog>
  );
}
