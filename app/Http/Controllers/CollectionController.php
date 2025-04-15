<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\Collection; //mewakili tabel collections

class CollectionController extends Controller implements HasMiddleware
{
    // Menetapkan middleware berbasis permission untuk setiap aksi
    public static function middleware()
    {
        return [
            new Middleware('collection:collections index', only: ['index']),
            new Middleware('collection:collections create', only: ['create', 'store']),
            new Middleware('collection:collections edit', only: ['edit', 'update']),
            new Middleware('collection:collection delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */

    // untuk menampilkan daftar koleksi
    public function index(Request $request)
    {
        // Mengambil data koleksi beserta relasi 'books' (asumsinya relasi one-to-many di model Collection)
        //  get collections
        $collections = Collection::with('books')
            // Jika terdapat parameter 'search', filter berdasarkan nama koleksi yang mengandung kata kunci tersebut
            ->when($request->search, fn($search) => $search->where('name', 'like', '%' . $request->search . '%'))
            // Mengurutkan hasil berdasarkan waktu terbaru (biasanya dari kolom created_at)
            ->latest()
            // Batasi hasil ke 6 item per halaman dan tetap pertahankan query string saat berpindah halaman
            ->paginate(6)->withQueryString();

        // render view
        // Render tampilan Collections/Index melalui Inertia.js,
        // Kirim data koleksi dan filter pencarian (jika ada) ke frontend
        return inertia('Collections/Index', ['collections' => $collections, 'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // render view
        return inertia('Collections/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions']);

        // create new permission data
        Collection::create(['name' => $request->name]);

        // render view
        return to_route('collections.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Collection $collection)
    {
        // render view
        return inertia('Permissions/Edit', ['permission' => $collection]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Collection $collection)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions,name,' . $collection->id]);

        // update permission data
        $collection->update(['name' => $request->name]);

        // render view
        return to_route('collections.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collection $collection)
    {
        // delete permissions data
        $collection->delete();

        // render view
        return back();
    }
}