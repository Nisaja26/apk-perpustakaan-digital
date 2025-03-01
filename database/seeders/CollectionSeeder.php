<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CollectionSeeder extends Seeder
{
    public function run()
    {
        // memasukkan data
        DB::table('collections')->insert([
            'name' => 'Fiksi',
            'location' => 'Lantai 1',
        ]);
    }
}
