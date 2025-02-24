<?php

// lokasi file
namespace App\Http\Controllers;

// untuk menangani permintaan HTTP dan validasi input
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\Middleware;

// implementasi interface middleware
use Illuminate\Routing\Controllers\HasMiddleware;

// import model permissions
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        // method has midlleware
        // implementasi interface, mendefinisikan midlleware untuk controller
        return [
            // mendefinisikan setiap aksi
            // misalnya user hanya memiliki izin untuk index dsb
            new Middleware('permission:permissions index', only: ['index']),
            new Middleware('permission:permissions create', only: ['create', 'store']),
            new Middleware('permission:permissions edit', only: ['edit', 'update']),
            new Middleware('permission:permissions delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //  get permissions
        //  Menampilkan daftar permissions dengan dukungan pencarian dan pagination
        $permissions = Permission::select('id', 'name')
            ->when($request->search,fn($search) => $search->where('name', 'like', '%'.$request->search.'%'))
            // urutan data dengan waktu
            ->latest() 
            // paginate = tampilkan 6 item perhalaman
            // querystring tetap ada saat navigasi halaman pagination
            ->paginate(6)->withQueryString();

        // render view
        return inertia('Permissions/Index', ['permissions' => $permissions,'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // menampilkan form baru untuk permissions baru
    public function create()
    {
        // render view
        return inertia('Permissions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    // mentimpan permissions baru
    public function store(Request $request)
    {
        // validate request
        // mencari apakah nama sudah ada persyaratan lainnya
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions']);

        // create new permission data
        // membuat entri baru
        Permission::create(['name' => $request->name]);

        // render view
        // Mengarahkan pengguna kembali ke halaman daftar permission setelah berhasil menyimpan.
        return to_route('permissions.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    // mengedit permissions yang sudah ada jika ingin dirubah
    public function edit(Permission $permission)
    // menampilkan data yang ingin di edit sesuai dengan id yang dicari
    {
        // render view
        return inertia('Permissions/Edit', ['permission' => $permission]);
    }

    /**
     * Update the specified resource in storage.
     */
    // mentimpan hasil pembaharuan data
    public function update(Request $request, Permission $permission)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions,name,'.$permission->id]);

        // update permission data
        $permission->update(['name' => $request->name]);

        // render view
        return to_route('permissions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    // menghapus data
    public function destroy(Permission $permission)
    {
        // delete permissions data
        $permission->delete();

        // render view
        // kembali ke halaman sebelumnya
        return back();
    }
}
// Kode di atas adalah implementasi controller di Laravel yang memungkinkan pengelolaan izin (permissions) dalam aplikasi. Dengan menggunakan model Permission, middleware untuk mengatur akses, validasi untuk memastikan data yang benar,
//  serta Inertia.js untuk merender tampilan, controller ini mengelola operasi dasar CRUD untuk entitas permission.