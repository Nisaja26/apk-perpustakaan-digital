<?php

namespace App\Models;

// Menggunakan trait untuk memudahkan pembuatan factory, otentikasi pengguna, notifikasi, dan pengelolaan peran/izin
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    // Menggunakan trait untuk fitur-fitur tertentu
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * Atribut-atribut yang dapat diisi secara massal.
     * Ini berarti nilai-nilai ini bisa diatur langsung lewat metode seperti create() atau update().
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',      // Nama pengguna
        'email',     // Email pengguna
        'password',  // Password pengguna
    ];

    /**
     * Atribut-atribut yang harus disembunyikan saat serialisasi (misalnya saat mengonversi model menjadi JSON).
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',      // Menyembunyikan password dari hasil serialisasi
        'remember_token',// Menyembunyikan token "remember me" dari hasil serialisasi
    ];

    /**
     * Mendefinisikan casting tipe data untuk beberapa atribut.
     * Misalnya, 'email_verified_at' di-cast menjadi tipe datetime, dan 'password' akan diperlakukan sebagai password yang sudah di-hash.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime', // Mengonversi atribut 'email_verified_at' menjadi objek datetime
            'password' => 'hashed',           // Mengonversi atribut 'password' menjadi hashed password
        ];
    }

    /**
     * Mendapatkan semua izin yang dimiliki oleh pengguna dalam bentuk array.
     * Setiap izin dikembalikan dalam bentuk key-value, di mana nama izin menjadi key dan nilainya 'true'.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getUserPermissions()
    {
        // Mengambil semua izin yang dimiliki pengguna dan memetakan nama izin menjadi key dengan nilai true
        return $this->getAllPermissions()->mapWithKeys(fn($permission) => [$permission['name'] => true]);
    }

    // relasi dari review
    public function reviews()
    {
        return $this->HasMany(Review::class);
    }

    // Relasi ke BookLoan (satu user bisa memiliki banyak BookLoan)
    public function bookLoans()
    {
        return $this->hasMany(BookLoan::class);
    }
}
