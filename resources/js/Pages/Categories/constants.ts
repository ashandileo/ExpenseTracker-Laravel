import React from "react";
import {
  ShoppingCart,
  Coffee,
  Car,
  Zap,
  Gamepad2,
  GraduationCap,
  Heart,
  Home,
} from "lucide-react";

export interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  spent: number;
  budget: number;
  transactionCount: number;
  trend: "up" | "down";
  trendValue: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Food & Groceries",
    icon: ShoppingCart,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
    spent: 1800000,
    budget: 2500000,
    transactionCount: 24,
    trend: "up",
    trendValue: "+8%",
  },
  {
    id: 2,
    name: "Coffee & Drinks",
    icon: Coffee,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
    spent: 380000,
    budget: 500000,
    transactionCount: 15,
    trend: "up",
    trendValue: "+15%",
  },
  {
    id: 3,
    name: "Transportation",
    icon: Car,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
    spent: 650000,
    budget: 1000000,
    transactionCount: 18,
    trend: "down",
    trendValue: "-5%",
  },
  {
    id: 4,
    name: "Utilities",
    icon: Zap,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10",
    spent: 750000,
    budget: 800000,
    transactionCount: 4,
    trend: "up",
    trendValue: "+3%",
  },
  {
    id: 5,
    name: "Entertainment",
    icon: Gamepad2,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10",
    spent: 420000,
    budget: 500000,
    transactionCount: 8,
    trend: "down",
    trendValue: "-12%",
  },
  {
    id: 6,
    name: "Education",
    icon: GraduationCap,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-500/10",
    spent: 150000,
    budget: 300000,
    transactionCount: 2,
    trend: "down",
    trendValue: "-20%",
  },
  {
    id: 7,
    name: "Healthcare",
    icon: Heart,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-500/10",
    spent: 120000,
    budget: 500000,
    transactionCount: 1,
    trend: "down",
    trendValue: "-60%",
  },
  {
    id: 8,
    name: "Housing",
    icon: Home,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10",
    spent: 2500000,
    budget: 2500000,
    transactionCount: 1,
    trend: "up",
    trendValue: "0%",
  },
];

export function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
