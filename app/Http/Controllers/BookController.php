<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category; // Pastikan Category di-import
use App\Models\Collection; // Pastikan Collection di-import
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    // Menampilkan daftar buku
    public function index()
    {
        // Mengambil semua buku dengan relasi collection dan category menggunakan eager loading
        $books = Book::with(['collection', 'category'])->paginate(10);
    
        return Inertia::render('Books/Index', [
            'books' => $books,
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

        // Redirect setelah berhasil
        return redirect()->route('books.index');
    }

    // Menampilkan form untuk membuat buku baru
    public function create()
    {
        // Menyiapkan data kategori dan koleksi untuk dropdown di frontend
        $categories = Category::all();
        $collections = Collection::all();
        
        return Inertia::render('Books/Create', [
            'categories' => $categories,  // Mengirimkan kategori ke halaman create
            'collections' => $collections,  // Mengirimkan koleksi ke halaman create
        ]);
    }

    // Menampilkan form untuk mengedit buku
    public function edit(Book $book)
    {
        // Menyiapkan data kategori dan koleksi untuk dropdown di frontend
        $categories = Category::all();
        $collections = Collection::all();
        
        return Inertia::render('Books/Edit', [
            'book' => $book,
            'categories' => $categories,  // Mengirimkan kategori ke halaman edit
            'collections' => $collections,  // Mengirimkan koleksi ke halaman edit
        ]);
    }

    // Mengupdate buku
    public function update(Request $request, Book $book)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|date_format:Y',  // Menggunakan tahun
            'category_id' => 'required|exists:categories,id',  // Validasi kategori
            'collection_id' => 'required|exists:collections,id',  // Validasi koleksi
        ]);

        // Update data buku
        $book->update([
            'title' => $request->title,
            'author' => $request->author,
            'published_year' => $request->published_year,
            'category_id' => $request->category_id,  // Update kategori
            'collection_id' => $request->collection_id,  // Update koleksi
        ]);

        return redirect()->route('books.index');
    }

    // Menghapus buku
    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index');
    }
}
