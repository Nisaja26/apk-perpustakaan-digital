<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
 // Tentukan relasi dengan model user
 public function user()
 {
     return $this->belongsTo(User::class);
 }

 // Tentukan relasi dengan model book
 public function book()
 {
     return $this->belongsTo(Book::class);
 }

 // Menambahkan 'name' dan atribut lainnya ke dalam fillable
 protected $fillable = [ 'user_id', 'book_id', 'comment', 'rating'];
//
}
