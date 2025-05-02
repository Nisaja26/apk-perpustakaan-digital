<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    // Tentukan relasi dengan model Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Tentukan relasi dengan model Collection
    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

    // Menambahkan 'name' dan atribut lainnya ke dalam fillable
    protected $fillable = ['title', 'author', 'publication_year', 'category_id', 'collection_id'];

}
