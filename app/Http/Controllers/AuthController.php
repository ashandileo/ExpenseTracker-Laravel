<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $this->createSeedData($user);

        Auth::login($user);

        return redirect('/');
    }

    private function createSeedData(User $user): void
    {
        $categories = [
            ['name' => 'Food & Drinks', 'icon' => 'Coffee', 'color' => 'amber', 'budget' => 1000000],
            ['name' => 'Transportation', 'icon' => 'Car', 'color' => 'blue', 'budget' => 500000],
            ['name' => 'Entertainment', 'icon' => 'Gamepad2', 'color' => 'purple', 'budget' => 500000],
        ];

        $createdCategories = [];
        foreach ($categories as $category) {
            $createdCategories[] = $user->categories()->create($category);
        }

        $today = now();
        $expenses = [
            ['category' => 0, 'description' => 'Lunch at restaurant', 'amount' => 45000, 'date' => $today->copy()->subDays(1), 'note' => null],
            ['category' => 1, 'description' => 'Grab ride to office', 'amount' => 25000, 'date' => $today->copy()->subDays(2), 'note' => null],
            ['category' => 2, 'description' => 'Netflix subscription', 'amount' => 65000, 'date' => $today->copy()->subDays(3), 'note' => null],
        ];

        foreach ($expenses as $expense) {
            $user->expenses()->create([
                'category_id' => $createdCategories[$expense['category']]->id,
                'description' => $expense['description'],
                'amount' => $expense['amount'],
                'date' => $expense['date'],
                'note' => $expense['note'],
            ]);
        }
    }
}
