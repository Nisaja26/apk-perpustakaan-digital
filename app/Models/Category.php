<?php

namespace App\Models;

// fitru fctory eloquent
use Illuminate\Database\Eloquent\Factories\HasFactory;
// untuk membuat data palsu atau data dummy saat pengujian atau migrasi data
use Illuminate\Database\Eloquent\Model;

class Category extends Model
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

    // Relasi ke Books
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}
