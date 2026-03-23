import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from "../forms/CategoryForm";
import type { CategoryFormValues } from "../forms/schema";
import { Category } from "../../constants";

interface CategoryEditDialogProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryEditDialog({
  category,
  open,
  onOpenChange,
}: CategoryEditDialogProps) {
  function handleSubmit(values: CategoryFormValues) {
    console.log("Edit category:", category?.id, values);
    // TODO: implement actual update logic
    onOpenChange(false);
  }

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the details of this category.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          key={category.id}
          defaultValues={{
            name: category.name,
            budget: category.budget,
          }}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}
