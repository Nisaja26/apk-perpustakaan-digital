<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    // Menampilkan daftar koleksi
    public function index()
    {
        $collections = Collection::all();
        return view('collections.index', compact('collections'));
    }

    // Menyimpan koleksi baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Collection::create([
            'name' => $request->name,
        ]);

        return redirect()->route('collections.index');
    }

    // Menampilkan form untuk mengedit koleksi
    public function edit(Collection $collection)
    {
        return view('collections.edit', compact('collection'));
    }

    // Mengupdate koleksi
    public function update(Request $request, Collection $collection)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $collection->update([
            'name' => $request->name,
        ]);

        return redirect()->route('collections.index');
    }

    // Menghapus koleksi
    public function destroy(Collection $collection)
    {
        $collection->delete();
        return redirect()->route('collections.index');
    }
}
