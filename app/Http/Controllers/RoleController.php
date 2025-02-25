<?php
// lokasi filenya
namespace App\Http\Controllers;
// import beberapa kelas
// Untuk menangani data yang dikirimkan oleh pengguna melalui HTTP
use Illuminate\Http\Request;
//  untuk mengatur middleware secara manual untuk controller.
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
// Model yang disediakan oleh Spatie Laravel Permission untuk mengelola roles dan permissions
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

 // Implement Middleware Spatie
class RoleController extends Controller implements HasMiddleware
{
    // untuk menentukan middleware yang harus diterapkan pada setiap aksi dalam controller ini.

    // mendefinisikan middleware untuk setiap metode di controller
    public static function middleware()
    {
        return [
            // Hanya pengguna yang memiliki izin roles untuk akses metode-metode
            new Middleware('permission:roles index', only: ['index']),
            new Middleware('permission:roles create', only: ['create', 'store']),
            new Middleware('permission:roles edit', only: ['edit', 'update']),
            new Middleware('permission:roles delete', only: ['destroy']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    // menampilkan daftsr roles
    public function index(Request $request)
    {
        // get roles
        // Mengambil data roles yang hanya mencakup id dan name, dan juga memuat relasi permissions yang terkait dengan role
        $roles = Role::select('id', 'name')
            ->with('permissions:id,name')
            //  // Fitur pencarian berdasarkan nama role
            ->when($request->search,fn($search) => $search->where('name', 'like', '%'.$request->search.'%'))
            ->latest()
            // Mengambil data role terbaru dan membaginya dalam 6 item per halaman
            ->paginate(6);

        // render view
        // Mengembalikan tampilan Roles/Index dengan data roles dan filter pencarian yang diterapkan
        return inertia('Roles/Index', ['roles' => $roles,'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // Menampilkan Formulir Pembuatan Role
    public function create()
    {
        // get permissions
        // $permissions = Permission::all();
        // Mengambil semua permissions yang diurutkan berdasarkan name dan mengambil pasangan name => id untuk digunakan di form
        $data = Permission::orderBy('name')->pluck('name', 'id');

        // Mengelompokkan permissions berdasarkan kata pertama dalam nama permission.
        //  Ini dilakukan dengan memecah string permission menjadi array kata-kata, lalu menggunakan kata pertama sebagai key untuk grup.
        $collection = collect($data);
        $permissions = $collection->groupBy(function ($item, $key) {
            // Memecah string menjadi array kata-kata
            $words = explode(' ', $item);

            // Mengambil kata pertama
            return $words[0];
        });
        // return $permissions;
        // render view
        //Mengembalikan tampilan Roles/Create dengan data permissions yang dikelompokkan.
        return inertia('Roles/Create', ['permissions' => $permissions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // menyimpan role baru ke database
    public function store(Request $request)
    {
         // validate request
         $request->validate([
            //  Nama role harus unik panjang 3 sampai 255 
            'name' => 'required|min:3|max:255|unique:roles',
            // Harus ada array yang berisi minimal satu permission yang dipilih
            'selectedPermissions' => 'required|array|min:1',
        ]);

        // create new role data dengan nama yang diberikan
        $role = Role::create(['name' => $request->name]);

        // give permissions to role
        // Memberikan permission yang dipilih ke role yang baru dibuat
        $role->givePermissionTo($request->selectedPermissions);

        // render view
        //  Mengarahkan pengguna kembali ke daftar roles setelah berhasil menyimpan
        return to_route('roles.index');
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
    // form untuk mengedit role yang sudah ada
    public function edit(Role $role)
    {
        // get permissions
        // Memuat permissions yang terkait dengan role tersebut untuk ditampilkan di formulir
        $data = Permission::orderBy('name')->pluck('name', 'id');

        $collection = collect($data);
        $permissions = $collection->groupBy(function ($item, $key) {
            // Memecah string menjadi array kata-kata
            $words = explode(' ', $item);

            // Mengambil kata pertama
            return $words[0];
        });

        // load permissions
        $role->load('permissions');

        // render view
        // Mengembalikan tampilan Roles/Edit dengan data role yang akan diedit dan daftar permissions
        return inertia('Roles/Edit', ['role' => $role, 'permissions' => $permissions]);
    }

    /**
     * Update the specified resource in storage.
     */
    // Memperbaharui role
    public function update(Request $request, Role $role)
    {
        // validate request
        // Nama harus unik kecuali untuk role yang sedang diedit 
        $request->validate([
            'name' => 'required|min:3|max:255|unique:roles,name,'.$role->id,
            // Harus ada array permission yang dipilih
            'selectedPermissions' => 'required|array|min:1',
        ]);

        // update role data
        // memperbaharui nama role
        $role->update(['name' => $request->name]);

        // give permissions to role
        // Menyelaraskan permissions yang terkait dengan role,
        //  yaitu menambahkan permission baru dan menghapus yang tidak dipilih
        $role->syncPermissions($request->selectedPermissions);

        // render view
        // kembali ke index
        return to_route('roles.index');
    }
    /**
     * Remove the specified resource from storage.
     */
    // menghapus role yang ada
    public function destroy(Role $role)
    {
        // delete role data
        // hapus role dari database
        $role->delete();

        // render view
        // kembali ke page sebelumnya
        return back();
    }
}