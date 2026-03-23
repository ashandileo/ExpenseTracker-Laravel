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
  Tag,
} from "lucide-react";

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  budget: number;
  spent: number;
  transaction_count: number;
}

export const iconMap: Record<
  string,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  ShoppingCart: {
    icon: ShoppingCart,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  Coffee: {
    icon: Coffee,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  Car: {
    icon: Car,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  Zap: {
    icon: Zap,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  Gamepad2: {
    icon: Gamepad2,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  GraduationCap: {
    icon: GraduationCap,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  Heart: {
    icon: Heart,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-500/10",
  },
  Home: {
    icon: Home,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
};

const defaultIcon = {
  icon: Tag,
  color: "text-gray-600 dark:text-gray-400",
  bgColor: "bg-gray-500/10",
};

export function getCategoryStyle(iconName: string) {
  return iconMap[iconName] ?? defaultIcon;
}

export function formatRupiah(n: number | null | undefined) {
  return "Rp " + (n ?? 0).toLocaleString("id-ID");
}
