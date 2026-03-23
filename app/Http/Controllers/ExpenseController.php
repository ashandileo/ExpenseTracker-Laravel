<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $expenses = $request->user()
            ->expenses()
            ->with('category:id,name,icon,color')
            ->orderByDesc('date')
            ->orderByDesc('created_at')
            ->get();

        $categories = $request->user()
            ->categories()
            ->select('id', 'name', 'icon', 'color')
            ->orderBy('name')
            ->get();

        return Inertia::render('Expenses', [
            'expenses' => $expenses,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'integer', 'min:1'],
            'date' => ['required', 'date'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        $request->user()->expenses()->create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Expense $expense)
    {
        if ($expense->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'integer', 'min:1'],
            'date' => ['required', 'date'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        $expense->update($validated);

        return redirect()->back();
    }

    public function destroy(Request $request, Expense $expense)
    {
        if ($expense->user_id !== $request->user()->id) {
            abort(403);
        }

        $expense->delete();

        return redirect()->back();
    }
}
