<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();
        $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
        $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();

        // Total this month
        $totalThisMonth = $user->expenses()
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        // Total last month
        $totalLastMonth = $user->expenses()
            ->whereBetween('date', [$startOfLastMonth, $endOfLastMonth])
            ->sum('amount');

        // Days passed this month
        $daysPassed = $now->day;

        // Daily average this month
        $dailyAvgThisMonth = $daysPassed > 0 ? round($totalThisMonth / $daysPassed) : 0;

        // Daily average last month (full month)
        $daysLastMonth = $now->copy()->subMonth()->daysInMonth;
        $dailyAvgLastMonth = $daysLastMonth > 0 ? round($totalLastMonth / $daysLastMonth) : 0;

        // Total budget from all categories
        $totalBudget = $user->categories()->sum('budget');

        // Total active categories
        $totalCategories = $user->categories()->count();

        // Categories last month count
        $categoriesLastMonth = $user->expenses()
            ->whereBetween('date', [$startOfLastMonth, $endOfLastMonth])
            ->distinct('category_id')
            ->count('category_id');

        // Categories used this month
        $categoriesThisMonth = $user->expenses()
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->distinct('category_id')
            ->count('category_id');

        // Budget overview: categories with their spent amount this month
        $budgetOverview = $user->categories()
            ->where('budget', '>', 0)
            ->withSum(['expenses as spent' => function ($query) use ($startOfMonth, $endOfMonth) {
                $query->whereBetween('date', [$startOfMonth, $endOfMonth]);
            }], 'amount')
            ->get()
            ->map(fn ($cat) => [
                'category' => $cat->name,
                'icon' => $cat->icon,
                'color' => $cat->color,
                'spent' => (int) ($cat->spent ?? 0),
                'budget' => $cat->budget,
            ]);

        // Recent expenses (last 6)
        $recentExpenses = $user->expenses()
            ->with('category:id,name,icon,color')
            ->orderByDesc('date')
            ->orderByDesc('created_at')
            ->limit(6)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_this_month' => $totalThisMonth,
                'total_last_month' => $totalLastMonth,
                'daily_avg_this_month' => $dailyAvgThisMonth,
                'daily_avg_last_month' => $dailyAvgLastMonth,
                'total_budget' => $totalBudget,
                'budget_remaining' => max(0, $totalBudget - $totalThisMonth),
                'total_categories' => $totalCategories,
                'categories_this_month' => $categoriesThisMonth,
                'categories_last_month' => $categoriesLastMonth,
            ],
            'budgetOverview' => $budgetOverview,
            'recentExpenses' => $recentExpenses,
        ]);
    }
}
