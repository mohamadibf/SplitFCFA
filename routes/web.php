<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// TODO(preview): routes temporaires pour valider visuellement les écrans SplitFCFA
// convertis depuis design_reference/ (données mockées). À retirer une fois les
// écrans validés et remplacés par l'implémentation réelle (routes/contrôleurs dédiés).
Route::inertia('preview/dashboard', 'dashboard');
Route::inertia('preview/expenses', 'expenses/index');
Route::inertia('preview/settle-up', 'settle-up');
Route::inertia('preview/analytics', 'analytics');
Route::inertia('preview/otp', 'auth/two-factor-challenge');

require __DIR__.'/settings.php';
