<?php

namespace Database\Seeders;

// import model user
use App\Models\User;
use Illuminate\Database\Seeder;
// import model role dan permission
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // insert data user
        //create user
        $user = User::create([
            'name'      => 'Nissa Admin',
            'email'     => 'nissadmin@gmail.com',
            'password'  => bcrypt('password'),
        ]);

        // setelah berhasil, data akan di ambil oleh permission yang ada 
        //get all permissions
        $permissions = Permission::all();

        // cari role dengan ID
        //get role admin
        $role = Role::find(1);

        // mendaftarkan semua permission ke dala role
        //assign permission to role
        $role->syncPermissions($permissions);

        // jika semua sudah memiliki hak akses 
        // assign role tersebut ke dalam user yang kita insert
        //assign role to user
        $user->assignRole($role);
    }
}
// ini adalah akses untuk Admin karena mendapatkan semua akses