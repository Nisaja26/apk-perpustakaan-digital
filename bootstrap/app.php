<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__)) // Menyusun dan mengonfigurasi aplikasi dengan basePath di direktori induk
    ->withRouting(
        web: __DIR__.'/../routes/web.php',        // Menentukan file routing untuk aplikasi web
        commands: __DIR__.'/../routes/console.php', // Menentukan file routing untuk perintah (console commands)
        health: '/up',                            // Menentukan endpoint untuk memeriksa status kesehatan aplikasi
    )
    ->withMiddleware(function (Middleware $middleware) { // Menambahkan middleware kustom ke aplikasi
        $middleware->alias([ // Menentukan alias untuk middleware
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class, // Alias 'role' digunakan untuk middleware yang memeriksa peran pengguna
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class, // Alias 'permission' untuk middleware izin pengguna
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class, // Alias 'role_or_permission' untuk middleware yang memeriksa peran atau izin
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) { // Fungsi untuk menangani pengecualian (error)
        // Biasanya digunakan untuk menyesuaikan cara pengecualian diproses
        //
    })
    ->create(); // Membuat dan mengembalikan instance aplikasi yang telah dikonfigurasi
