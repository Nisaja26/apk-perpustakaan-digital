<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class UserController extends Controller implements HasMiddleware
{
    // Method untuk mendefinisikan middleware yang diterapkan pada setiap action controller
    public static function middleware()
    {
        return [ 
            new Middleware('permission:users index', only: ['index']), // Membatasi akses untuk action index hanya jika memiliki permission 'users index'
            new Middleware('permission:users create', only: ['create', 'store']), // Membatasi akses untuk action create dan store hanya jika memiliki permission 'users create'
            new Middleware('permission:users edit', only: ['edit', 'update']), // Membatasi akses untuk action edit dan update hanya jika memiliki permission 'users edit'
            new Middleware('permission:users delete', only: ['destroy']), // Membatasi akses untuk action destroy hanya jika memiliki permission 'users delete'
        ];
    }

    // Menampilkan daftar user
    public function index(Request $request)
    {
        // Mengambil semua user, termasuk data role yang terkait, dan mendukung fitur pencarian
        $users = User::with('roles')
            ->when(request('search'), fn($query) => $query->where('name', 'like', '%'.request('search').'%')) // Menambahkan filter pencarian berdasarkan nama
            ->latest() // Mengurutkan berdasarkan data terbaru
            ->paginate(6); // Menampilkan 6 user per halaman

        // Mengembalikan tampilan 'Users/Index' dengan data users dan filter pencarian
        return inertia('Users/Index', ['users' => $users, 'filters' => $request->only(['search'])]);
    }

    // Menampilkan form untuk membuat user baru
    public function create()
    {
        // Mengambil semua role yang tersedia
        $roles = Role::latest()->get();

        // Mengembalikan tampilan 'Users/Create' dengan data role yang tersedia
        return inertia('Users/Create', ['roles' => $roles]);
    }

    // Menyimpan user baru ke dalam database
    public function store(Request $request)
    {
        // Validasi data input dari request
        $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users', // Pastikan email unik
            'password' => 'required|confirmed|min:4', // Password harus terkonfirmasi dan minimal 4 karakter
            'selectedRoles' => 'required|array|min:1', // Memastikan role yang dipilih minimal 1
        ]);

        // Membuat user baru di database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Enkripsi password
        ]);

        // Menetapkan role yang dipilih ke user yang baru dibuat
        $user->assignRole($request->selectedRoles);

        // Mengarahkan kembali ke daftar user
        return to_route('users.index');
    }

    // Menampilkan halaman untuk mengedit data user
    public function edit(User $user)
    {
        // Mengambil semua role yang tersedia, kecuali role 'super-admin'
        $roles = Role::where('name', '!=', 'super-admin')->get();

        // Memuat data role yang sudah ditetapkan ke user
        $user->load('roles');

        // Mengembalikan tampilan 'Users/Edit' dengan data user dan role yang tersedia
        return inertia('Users/Edit', ['user' => $user, 'roles' => $roles]);
    }

    // Memperbarui data user yang sudah ada
    public function update(Request $request, User $user)
    {
        // Validasi data input dari request
        $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id, // Pastikan email unik kecuali untuk user yang sedang diedit
            'selectedRoles' => 'required|array|min:1', // Memastikan role yang dipilih minimal 1
        ]);

        // Memperbarui data user
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // Menyinkronkan role yang baru dipilih untuk user
        $user->syncRoles($request->selectedRoles);

        // Mengarahkan kembali ke daftar user
        return to_route('users.index');
    }

    // Menghapus user dari database
    public function destroy(User $user)
    {
        // Menghapus user
        $user->delete();

        // Mengarahkan kembali ke halaman sebelumnya
        return back();
    }
}
