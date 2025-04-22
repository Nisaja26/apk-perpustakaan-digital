<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(CollectionTableSeeder::class);
        // $this->call(BookTableSeeder::class);
    }
}
// kita memanggil class rolestableseeder, PermissionTableUser, UserTableSeeder dalam method run
// Proses akan di eksekusi secara berurutan