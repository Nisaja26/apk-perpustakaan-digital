<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category; // Pastikan Category di-import
use App\Models\Collection; // Pastikan Collection di-import
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller implements HasMiddleware
{
    // Method untuk mendefinisikan middleware yang diterapkan pada setiap action controller
    public static function middleware()
    {
        return [
            new Middleware('permission:books index', only: ['index']), // Membatasi akses untuk action index hanya jika memiliki permission 'books index'
            new Middleware('permission:books create', only: ['create', 'store']), // Membatasi akses untuk action create dan store hanya jika memiliki permission 'books create'
            new Middleware('permission:books edit', only: ['edit', 'update']), // Membatasi akses untuk action edit dan update hanya jika memiliki permission 'books edit'
            new Middleware('permission:books delete', only: ['destroy']), // Membatasi akses untuk action destroy hanya jika memiliki permission 'books delete'
        ];
    }

    // Menampilkan daftar buku
    public function index(Request $request)
    {

        // Pastikan query yang digunakan benar dan tidak menghasilkan error
        $books = Book::with(['collection', 'category'])
            ->when(request('search'), fn($query) => $query->where('name', 'like', '%' . request('search') . '%'))
            ->latest()
            ->paginate(6);

        return inertia('Books/Index', ['books' => $books, 'filters' => $request->only(['search'])]);


    }

    // Menampilkan form untuk membuat buku baru
    public function create()
    {
        // Mengambil data kategori dan koleksi
        $categories = Category::all(); // Mengambil semua kategori
        $collections = Collection::all(); // Mengambil semua koleksi

        // Mengirimkan data kategori dan koleksi ke halaman create
        return Inertia::render('Books/Create', [
            'categories' => $categories,  // Data kategori
            'collections' => $collections,  // Data koleksi
        ]);


    }

    // Menyimpan buku baru
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|date_format:Y',  // Pastikan format tahun
            'category_id' => 'required|exists:categories,id',  // Validasi kategori
            'collection_id' => 'required|exists:collections,id',  // Validasi koleksi
        ]);

        // Menyimpan buku baru
        Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'published_year' => $request->published_year,
            'category_id' => $request->category_id,  // Menyertakan ID kategori
            'collection_id' => $request->collection_id,  // Menyertakan ID koleksi
        ]);

        return redirect()->route('books.index');  // Redirect setelah menyimpan buku
    }

    // // Menampilkan form untuk mengedit buku
    // public function edit(Book $book)
    // {
    //     // Menyiapkan data kategori dan koleksi untuk dropdown di frontend
    //     $categories = Category::all();
    //     $collections = Collection::all();

    //     return Inertia::render('Books/Edit', [
    //         'book' => $book,
    //         'categories' => $categories,  // Mengirimkan kategori ke halaman edit
    //         'collections' => $collections,  // Mengirimkan koleksi ke halaman edit
    //     ]);
    // }

    // // Mengupdate buku
    // public function update(Request $request, Book $book)
    // {
    //     // Validasi input
    //     $request->validate([
    //         'title' => 'required|string|max:255',
    //         'author' => 'required|string|max:255',
    //         'published_year' => 'required|date_format:Y',  // Menggunakan tahun
    //         'category_id' => 'required|exists:categories,id',  // Validasi kategori
    //         'collection_id' => 'required|exists:collections,id',  // Validasi koleksi
    //     ]);

    //     // Update data buku
    //     $book->update([
    //         'title' => $request->title,
    //         'author' => $request->author,
    //         'published_year' => $request->published_year,
    //         'category_id' => $request->category_id,  // Update kategori
    //         'collection_id' => $request->collection_id,  // Update koleksi
    //     ]);

    //     return redirect()->route('books.index');
    // }

    // Menghapus buku
    public function destroy(Book $book)
    {
        $book->delete();

        // Mengarahkan kembali ke halaman sebelumnya
        return back();
    }
}
