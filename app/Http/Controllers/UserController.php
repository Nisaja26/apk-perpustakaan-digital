<?php

namespace App\Http\Controllers;

//  model User yang berfungsi untuk berinteraksi dengan tabel users di database.
use App\Models\User;
// untuk menangani permintaan HTTP (seperti data dari form)
use Illuminate\Http\Request;
// untuk mengelola peran (roles) pengguna
use Spatie\Permission\Models\Role;
// untuk mengatur middleware untuk kontrol akses
use Illuminate\Routing\Controllers\Middleware;
// trait HasMiddleware yang digunakan untuk menambahkan middleware ke controller.
use Illuminate\Routing\Controllers\HasMiddleware;

// mengimplementasikan interface HasMiddleware, yang memungkinkan kita untuk menetapkan middleware yang spesifik pada setiap metode di controller ini.
class UserController extends Controller implements HasMiddleware
// Middleware digunakan untuk membatasi akses berdasarkan izin (permissions)
//  mendefinisikan middleware untuk setiap metode controller sesuai dengan izin yang dibutuhkan (create, edit, delete, dll.).
{

    // Menampilkan daftar pengguna yang terdaftar
    public static function middleware()
    {
        return [
            new Middleware('permission:users index', only : ['index']),
            new Middleware('permission:users create', only : ['create', 'store']),
            new Middleware('permission:users edit', only : ['edit', 'update   ']),
            new Middleware('permission:users delete', only : ['destroy']),
        ];
        // when(request('search'), ...): Filter pencarian berdasarkan nama pengguna jika parameter search diberikan dalam permintaan.
        // latest(): Mengurutkan pengguna berdasarkan tanggal terbaru.
        // paginate(6): Membatasi hasil per halaman menjadi 6 pengguna.
       // Render View: Menggunakan inertia() untuk merender tampilan Users/Index dan meneruskan data pengguna dan filter pencarian.
    }


    /**
     * Display a listing of the resource.
     */
    //  untuk membuat pengguna baru
    public function index(Request $request)
    {
        // get all users
        $users = User::with('roles')
            ->when(request('search'), fn($query) => $query->where('name', 'like', '%'.request('search').'%'))
             // Mengurutkan pengguna berdasarkan tanggal terbaru.
            ->latest()
            //  Membatasi hasil per halaman menjadi 6 pengguna
            ->paginate(6);

            // Role::latest()->get(): Mengambil semua peran yang ada dalam aplikasi
           

        // render view
        return inertia('Users/Index', ['users' => $users,'filters' => $request->only(['search'])]);
        // gunakan inertia untuk merender tampilan Users/Create dan meneruskan data roles ke tampilan.
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
         // get roles
         $roles = Role::latest()->get();
         // render view
         return inertia('Users/Create', ['roles' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    //  Menyimpan pengguna baru ke dalam database
    public function store(Request $request)
    {
         // validate request
        //  Memvalidasi data yang diterima dari form (nama, email, password, dan peran yang dipilih).
         $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:4',
            'selectedRoles' => 'required|array|min:1',
        ]);

        // create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            // Mengenkripsi password sebelum disimpan di database
            'password' => bcrypt($request->password),
        ]);

        // attach roles
        // Menetapkan peran yang dipilih untuk pengguna yang baru
        $user->assignRole($request->selectedRoles);

        // render view
        //  pengguna diarahkan kembali ke halaman daftar pengguna
        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    // untuk mengedit data pengguna
    public function edit(User $user)
    {

        // get roles
        $roles = Role::where('name', '!=', 'super-admin')->get();
        // Mengambil peran-peran yang ada kecuali peran super-admin

        // load roles
        $user->load('roles');
        // peran-peran yang sudah ada pada pengguna

        // render view
        return inertia('Users/Edit', ['user' => $user, 'roles' => $roles]);
        //  untuk merender tampilan Users/Edit dengan data pengguna dan peran yang tersedia
    }

    /**
     * Update the specified resource in storage.
     */
    // emperbarui data pengguna yang sudah ada
    public function update(Request $request, User $user)
    {
        // validate request
        // memvalidasi data yang diterima dari form
        $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'selectedRoles' => 'required|array|min:1',
        ]);

        // update user data
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // attach roles
        $user->syncRoles($request->selectedRoles);
        // Menyinkronkan peran yang dipilih dengan pengguna. Menghapus peran yang tidak dipilih dan menambahkan peran yang baru dipilih.

        // render view
        return to_route('users.index');
        //  Mengarahkan kembali ke halaman daftar pengguna setelah pembaruan selesai.
    }

    /**
     * Remove the specified resource from storage.
     */
    // Menghapus pengguna dari database.
    public function destroy(User $user)
    {
        // delete user data
        $user->delete();

        // render view
        return back();
        // Setelah penghapusan, pengguna diarahkan kembali ke halaman sebelumnya
    }
}
// Controller UserController ini menyediakan berbagai metode untuk mengelola data pengguna dalam aplikasi, termasuk:
// Menampilkan daftar pengguna (index).
// Menambahkan pengguna baru (create, store).
// Mengedit dan memperbarui data pengguna (edit, update).
// Menghapus pengguna (destroy).
// Menggunakan middleware untuk membatasi akses ke metode tertentu berdasarkan izin pengguna.