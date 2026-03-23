import { z } from "zod";

export const expenseFormSchema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z
    .number({ error: "Amount must be a number" })
    .positive({ error: "Amount must be greater than 0" }),
  category_id: z
    .number({ error: "Category is required" })
    .positive({ error: "Category is required" }),
  date: z.string().min(1, "Date is required"),
  note: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;
