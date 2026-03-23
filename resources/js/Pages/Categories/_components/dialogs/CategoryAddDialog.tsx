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
import { CategoryForm } from "../forms/CategoryForm";
import type { CategoryFormValues } from "../forms/schema";

interface CategoryAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryAddDialog({
  open,
  onOpenChange,
}: CategoryAddDialogProps) {
  function handleSubmit(values: CategoryFormValues) {
    router.post("/categories", values, {
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Category added successfully");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            Create a new budget category to organize your expenses.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Create Category"
        />
      </DialogContent>
    </Dialog>
  );
}
