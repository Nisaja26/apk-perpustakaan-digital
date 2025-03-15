<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category; // Pastikan Category di-import
use App\Models\Collection; // Pastikan Collection di-import
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class BookController extends Controller
{
    // Mendefinisikan middleware untuk setiap action
    public function __construct()
    {
        $this->middleware('permission:books index')->only(['index']);
        $this->middleware('permission:books create')->only(['create', 'store']);
        $this->middleware('permission:books edit')->only(['edit', 'update']);
        $this->middleware('permission:books delete')->only(['destroy']);
    }

    // Menampilkan daftar buku
    public function index(Request $request)
    {
        // Mengambil data buku dengan relasi collection dan category
        $books = Book::with(['category', 'collection'])
            ->when(request('search'), fn($query) => $query->where('title', 'like', '%'.request('search').'%')) // Memfilter berdasarkan judul buku
            ->latest()
            ->paginate(6);

         // Mengembalikan tampilan 'Users/Index' dengan data users dan filter pencarian
         return inertia('Books/Index', ['books' => $books, 'filters' => $request->only(['search'])]);
    }

    // Menampilkan form untuk membuat buku baru
    public function create()
    {
        // Mengambil semua kategori dan koleksi
        $categories = Category::all();
        $collections = Collection::all();

        return Inertia::render('Books/Create', [
            'categories' => $categories,  // Mengirimkan kategori ke form
            'collections' => $collections,  // Mengirimkan koleksi ke form
        ]);
    }

    // Menyimpan buku baru
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|date_format:Y',  // Memastikan format tahun adalah Y
            'category_id' => 'required|exists:categories,id',  // Validasi kategori
            'collection_id' => 'required|exists:collections,id',  // Validasi koleksi
        ]);

        // Menyimpan buku baru
        Book::create([
            'title' => $validated['title'],
            'author' => $validated['author'],
            'published_year' => $validated['published_year'],
            'category_id' => $validated['category_id'],
            'collection_id' => $validated['collection_id'],
        ]);

        // Redirect ke halaman daftar buku setelah penyimpanan berhasil
        return redirect()->route('books.index');
    }

    // Menampilkan form untuk mengedit buku
    public function edit(Book $book)
    {
        // Mengambil kategori dan koleksi untuk dropdown
        $categories = Category::all();
        $collections = Collection::all();

        return Inertia::render('Books/Edit', [
            'book' => $book,  // Mengirimkan data buku ke form
            'categories' => $categories,  // Mengirimkan kategori ke form
            'collections' => $collections,  // Mengirimkan koleksi ke form
        ]);
    }

    // Mengupdate data buku
    public function update(Request $request, Book $book)
    {
        // Validasi input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|date_format:Y',  // Format tahun
            'category_id' => 'required|exists:categories,id',  // Validasi kategori
            'collection_id' => 'required|exists:collections,id',  // Validasi koleksi
        ]);

        // Update data buku
        $book->update([
            'title' => $validated['title'],
            'author' => $validated['author'],
            'published_year' => $validated['published_year'],
            'category_id' => $validated['category_id'],
            'collection_id' => $validated['collection_id'],
        ]);

        // Redirect ke halaman daftar buku setelah update berhasil
        return redirect()->route('books.index');
    }

    // Menghapus buku
    public function destroy(Book $book)
    {
        $book->delete();

        // Redirect kembali ke halaman daftar buku setelah buku dihapus
        return back();
    }
}
