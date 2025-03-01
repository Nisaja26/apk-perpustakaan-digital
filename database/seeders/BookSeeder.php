<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    public function run()
    {
        // memasukkan data
        DB::table('books')->insert([
            'title' => 'Harry Potter',
            'author' => 'J.K. Rowling',
            'published_year' => 1997,
            'collection_id' => 1,  // Menunjukkan bahwa buku ini ada dalam koleksi Fiksi
        ]);
    }
}
