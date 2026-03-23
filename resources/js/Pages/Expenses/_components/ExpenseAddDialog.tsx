import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { categoryIcons } from "../constants";

interface ExpenseAddDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ExpenseAddDialog({ open, onOpenChange }: ExpenseAddDialogProps) {
    const categories = Object.keys(categoryIcons);

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
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Description
                        </small>
                        <Input placeholder="e.g. Grocery shopping" />
                    </div>
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Amount (Rp)
                        </small>
                        <Input
                            type="number"
                            placeholder="0"
                        />
                    </div>
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Category
                        </small>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem
                                        key={cat}
                                        value={cat}
                                    >
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Date
                        </small>
                        <Input type="date" defaultValue="2026-03-23" />
                    </div>
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Note{" "}
                            <span className="text-muted-foreground font-normal">
                                (optional)
                            </span>
                        </small>
                        <Textarea
                            placeholder="Add a note..."
                            rows={2}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>
                        Save Expense
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
