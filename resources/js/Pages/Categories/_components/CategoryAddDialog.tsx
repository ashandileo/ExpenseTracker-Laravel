import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface CategoryAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryAddDialog({
  open,
  onOpenChange,
}: CategoryAddDialogProps) {
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
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <small className="text-sm leading-none font-medium">
              Category Name
            </small>
            <Input placeholder="e.g. Subscriptions" />
          </div>
          <div className="space-y-2">
            <small className="text-sm leading-none font-medium">
              Monthly Budget (Rp)
            </small>
            <Input type="number" placeholder="0" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Create Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
