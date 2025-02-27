<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route untuk halaman utama (home page)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'), // Cek apakah rute login ada
        'canRegister' => Route::has('register'), // Cek apakah rute register ada
        'laravelVersion' => Application::VERSION, // Menampilkan versi Laravel
        'phpVersion' => PHP_VERSION, // Menampilkan versi PHP yang digunakan
    ]);
});

// Route untuk halaman dashboard yang membutuhkan autentikasi dan verifikasi email
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard'); // Render tampilan Dashboard menggunakan Inertia
})->middleware(['auth', 'verified']) // Middleware untuk memastikan pengguna sudah login dan verifikasi email
  ->name('dashboard'); // Menamai route sebagai 'dashboard'

// Grup route yang memerlukan autentikasi pengguna
Route::middleware('auth')->group(function () {
    // Route untuk mengelola permissions (izin)
    Route::resource('/permissions', PermissionController::class);
    
    // Route untuk mengelola roles (peran), mengecualikan method 'show'
    Route::resource('roles', RoleController::class)->except('show');
    
    // Route untuk mengelola users (pengguna)
    Route::resource('/users', UserController::class);
    
    // Route untuk mengedit profil pengguna
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    
    // Route untuk memperbarui profil pengguna
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    
    // Route untuk menghapus profil pengguna
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Memuat file rute untuk autentikasi (login, register, dll.)
require __DIR__ . '/auth.php';
