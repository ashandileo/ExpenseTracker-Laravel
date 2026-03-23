<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
});

Route::get('/expenses', function () {
    return Inertia::render('Expenses');
});

Route::get('/categories', function () {
    return Inertia::render('Categories');
});
