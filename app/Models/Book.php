<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Collection;

class Book extends Model
{
    use HasFactory;
    
    /**
     * post
     *
     * @return void
     */
    public function collections()
    {
        return $this->belongsTo(Collection::class);
    }
}