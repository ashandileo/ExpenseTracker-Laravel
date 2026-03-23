export interface ExpenseCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface Expense {
  id: number;
  category_id: number;
  description: string;
  amount: number;
  date: string;
  note?: string;
  category: ExpenseCategory;
}
