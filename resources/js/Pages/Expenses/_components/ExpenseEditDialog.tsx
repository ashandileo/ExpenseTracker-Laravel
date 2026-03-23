import { useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { categoryIcons } from "../constants";
import { Expense } from "../types";

interface ExpenseEditDialogProps {
    expense: Expense | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ExpenseEditDialog({ expense, open, onOpenChange }: ExpenseEditDialogProps) {
    const categories = Object.keys(categoryIcons);

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        if (expense) {
            setDescription(expense.description);
            setAmount(String(expense.rawAmount));
            setCategory(expense.category);
            setDate(expense.date);
            setNote(expense.note ?? "");
        }
    }, [expense]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Expense</DialogTitle>
                    <DialogDescription>
                        Update the details of this expense.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Description
                        </small>
                        <Input
                            placeholder="e.g. Grocery shopping"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Amount (Rp)
                        </small>
                        <Input
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <small className="text-sm leading-none font-medium">
                            Category
                        </small>
                        <Select value={category} onValueChange={setCategory}>
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
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
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
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
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
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
