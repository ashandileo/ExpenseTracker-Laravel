import React from "react";

export interface Expense {
    id: number;
    description: string;
    category: string;
    amount: string;
    rawAmount: number;
    date: string;
    note?: string;
    icon: React.ElementType;
    color: string;
}
