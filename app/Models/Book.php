<?php

// lokasi model
namespace App\Models;
// untuk mengorganisir kode sehingga tidak terjadi tabrakan nama antar kelas

// fitur Factory Eloquent
use Illuminate\Database\Eloquent\Factories\HasFactory;
// untuk membuat data palsu atau data dummy saat pengujian atau migrasi data

// kelas dasar Model dari Laravel
use Illuminate\Database\Eloquent\Model;

// mendeklarasikan kelas Book
class Book extends Model
// untuk berinteraksi dengan tabel books
{

    //  trait HasFactory
    use HasFactory;
    // untuk mengakses fungsionalitas pabrik (factory) 

    // untuk mendefinisikan kolom-kolom yang boleh diisi secara massal
    protected $fillable = [
        'title', 
        'author', 
        'published_year',  
        'collection_id'
    ];

    // Relasi One-to-Many dengan model Collection
    public function collection()
    {
        // bahwa setiap buku Book berhubungan dengan satu entitas Collection
        return $this->belongsTo(Collection::class);
    }
}