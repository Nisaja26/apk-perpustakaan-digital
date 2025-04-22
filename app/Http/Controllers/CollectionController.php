<?php

namespace App\Http\Controllers;
// untuk mengorganisasi file PHP dan menghindari konflik antara class dengan nama yang sama


// use Illuminate\Database\Eloquent\Collection;

use App\Models\Collection;

use Illuminate\Http\Request;
// Mengimpor class Request dari Laravel
use Illuminate\Routing\Controllers\HasMiddleware;
// menggunakan metode middleware()

use Illuminate\Routing\Controllers\Middleware;
// untuk mendefinisikan middleware

use Spatie\Permission\Models\Permission;
// ntuk mengelola hak akses

class CollectionController implements HasMiddleware
{
    public static function middleware()
    {
        // mengatur hak akses 
        return [
            new Middleware('permission:collections index', only: ['index']),
            new Middleware('permission:collections create', only: ['create', 'store']),
            new Middleware('permission:collections edit', only: ['edit', 'update']),
            new Middleware('permission:collections delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    
    //  untuk menampilkan daftar data
     public function index(Request $request)
    {
        //  get permissions
        $collections = Collection ::select('id', 'name')
        // mengambil data dari tabel collection
            ->when($request->search,fn($search) => $search->where('name', 'like', '%'.$request->search.'%'))
            // logika ketika ingin men seacrhing data
            ->latest()
            // mengurutkan data dengan urutan terbaru paling atas
            ->paginate(6)->withQueryString();
            // menampilkan 6 data per halaman

        // render view
        return inertia('Collections/Index', ['collections' => $collections,'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    
    //  menuju halaman create koleksi
    public function create()
    {
        // render view
        return inertia('Collections/Create');
    }

    /**
     * Store a newly created resource in storage.
     */

    //  memasukan data yang telah dikirim 
    public function store(Request $request)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:collections']);

        // create new data
        Collection::create(['name' => $request->name]);

        // kembali ke halaman
        return to_route('collections.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Collection $collection) 
    {
        // render view
        return inertia('Collections/Edit', ['collection' => $collection]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Collection $collection)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:collections,name,'.$collection->id]);

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