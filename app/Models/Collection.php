<?php

// lokasi model
namespace App\Models;
// agar tidak bertabrakan dengan kelas lain

// fitru fctory eloquent
use Illuminate\Database\Eloquent\Factories\HasFactory;
// untuk membuat data palsu atau data dummy saat pengujian atau migrasi data

// kelas dasar Model dari Laravel
use Illuminate\Database\Eloquent\Model;

// mendeklarasikan kelas collection
class Collection extends Model
{

    //  trait HasFactory
    use HasFactory;
    // untuk mengakses fungsionalitas pabrik (factory) 


    // untuk mendefinisikan kolom-kolom yang boleh diisi secara massal
    protected $fillable = [
        'name',
        // lokasi koleksi
        'location'
    ];

    // Relasi One-to-Many dengan model Book
    public function books()
    {
        // Collection memiliki banyak buku
        return $this->hasMany(Book::class);
    }
}