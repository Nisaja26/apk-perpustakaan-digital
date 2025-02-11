<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// import model role
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // membuat create data baru
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);
    }
}