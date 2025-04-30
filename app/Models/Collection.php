<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Collection extends Model
{
    use HasFactory;
    
    /**
     * books
     *
     * @return void
     */
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}