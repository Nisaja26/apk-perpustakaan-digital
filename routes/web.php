<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// untuk halaman home
Route::get('/', function () {
    // tampilan home dari inertia
    return Inertia::render('Welcome', [
        // mengecek route login
        'canLogin' => Route::has('login'),
        // cek route register
        'canRegister' => Route::has('register'),
        // versi-versi yang digunakan
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// jika berhasil login ini akan muncul
Route::get('/dashboard', function () {
    // tampilan dashbiard dari inertia
    return Inertia::render('Dashboard');

    // auth: Menghentikan akses ke halaman jika pengguna belum login.
    // verified: Menghentikan akses jika pengguna belum memverifikasi alamat email mereka.
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(...): Kelompokkan rute-rute yang memerlukan middleware auth.
Route::middleware('auth')->group(function () {
    // permissions route
    // terkait operasi CRUD untuk Permission dengan controller mencakup function2 yang ada di file PermissionController
    Route::resource('/permissions', PermissionController::class);

    // Menampilkan halaman untuk mengedit profil pengguna
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // penghapusan profil pengguna dengan metode HTTP DELETE
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// ni akan menyertakan rute yang didefinisikan dalam file auth.php, yang biasanya berisi rute-rute terkait dengan proses autentikasi,
//  seperti login, registrasi, dan logout. File ini dihasilkan secara otomatis ketika Anda menggunakan Laravel Breeze, 
require __DIR__.'/auth.php';

// /Kode ini mengonfigurasi berbagai rute di aplikasi Laravel, baik untuk halaman utama, dashboard, serta pengelolaan profil pengguna dan izin (permissions).
//  Dengan menggunakan Inertia.js, Laravel dapat merender tampilan frontend menggunakan framework JavaScript,
//  dan middleware auth digunakan untuk memastikan hanya pengguna yang sah yang dapat mengakses rute tertentu.