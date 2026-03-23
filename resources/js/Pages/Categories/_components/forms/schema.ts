import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  budget: z
    .number({ error: "Budget must be a number" })
    .positive({ error: "Budget must be greater than 0" }),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
