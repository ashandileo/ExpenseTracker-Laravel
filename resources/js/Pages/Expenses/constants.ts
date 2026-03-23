import React from "react";
import {
    ShoppingCart,
    Coffee,
    Car,
    Zap,
    UtensilsCrossed,
    Gamepad2,
    GraduationCap,
    Heart,
    Home,
} from "lucide-react";
import { Expense } from "./types";

export const categoryIcons: Record<string, { icon: React.ElementType; color: string }> = {
    "Food & Groceries": { icon: ShoppingCart, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    "Coffee & Drinks": { icon: Coffee, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    "Transportation": { icon: Car, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    "Utilities": { icon: Zap, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
    "Entertainment": { icon: Gamepad2, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    "Education": { icon: GraduationCap, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
    "Healthcare": { icon: Heart, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
    "Housing": { icon: Home, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
};

export const allExpenses: Expense[] = [
    { id: 1, description: "Grocery Shopping", category: "Food & Groceries", amount: "Rp 350.000", rawAmount: 350000, date: "2026-03-23", icon: ShoppingCart, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { id: 2, description: "Morning Coffee", category: "Coffee & Drinks", amount: "Rp 45.000", rawAmount: 45000, date: "2026-03-23", icon: Coffee, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    { id: 3, description: "Grab to Office", category: "Transportation", amount: "Rp 65.000", rawAmount: 65000, date: "2026-03-22", icon: Car, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { id: 4, description: "Electricity Bill", category: "Utilities", amount: "Rp 450.000", rawAmount: 450000, date: "2026-03-22", icon: Zap, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
    { id: 5, description: "Dinner with Friends", category: "Food & Groceries", amount: "Rp 280.000", rawAmount: 280000, date: "2026-03-21", icon: UtensilsCrossed, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
    { id: 6, description: "Netflix Subscription", category: "Entertainment", amount: "Rp 186.000", rawAmount: 186000, date: "2026-03-20", icon: Gamepad2, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    { id: 7, description: "Udemy Course", category: "Education", amount: "Rp 150.000", rawAmount: 150000, date: "2026-03-19", icon: GraduationCap, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
    { id: 8, description: "Gas Station", category: "Transportation", amount: "Rp 200.000", rawAmount: 200000, date: "2026-03-18", icon: Car, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { id: 9, description: "Water Bill", category: "Utilities", amount: "Rp 150.000", rawAmount: 150000, date: "2026-03-17", icon: Zap, color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
    { id: 10, description: "Lunch - Padang", category: "Food & Groceries", amount: "Rp 35.000", rawAmount: 35000, date: "2026-03-17", icon: UtensilsCrossed, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { id: 11, description: "Spotify Premium", category: "Entertainment", amount: "Rp 55.000", rawAmount: 55000, date: "2026-03-15", icon: Gamepad2, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
    { id: 12, description: "Vitamin Supplements", category: "Healthcare", amount: "Rp 120.000", rawAmount: 120000, date: "2026-03-14", icon: Heart, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
];
