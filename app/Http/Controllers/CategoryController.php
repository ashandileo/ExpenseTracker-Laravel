<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = $request->user()
            ->categories()
            ->withSum(['expenses as spent' => function ($query) {
                $query->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year);
            }], 'amount')
            ->withCount(['expenses as transaction_count' => function ($query) {
                $query->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year);
            }])
            ->get();

        return Inertia::render('Categories', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['sometimes', 'string', 'max:50'],
            'color' => ['sometimes', 'string', 'max:50'],
            'budget' => ['required', 'integer', 'min:1'],
        ]);

        $request->user()->categories()->create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['sometimes', 'string', 'max:50'],
            'color' => ['sometimes', 'string', 'max:50'],
            'budget' => ['required', 'integer', 'min:1'],
        ]);

        $category->update($validated);

        return redirect()->back();
    }

    public function destroy(Request $request, Category $category)
    {
        if ($category->user_id !== $request->user()->id) {
            abort(403);
        }

        $category->delete();

        return redirect()->back();
    }
}
