<?php

namespace App\Http\Controllers;

use App\Models\Book;
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
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|date_format:Y',  // Menggunakan tahun
        ]);

        Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'published_year' => $request->published_year,
            'collection_id' => $request->collection_id,  // Menyertakan ID koleksi
        ]);

        return redirect()->route('books.index');
    }


    public function create()
    {
        return Inertia::render('Books/Create');
    }

    // Menampilkan form untuk mengedit buku
    public function edit(Book $book)
    {
        return Inertia::render('Books/Edit', [
            'book' => $book,
        ]);
    }

    // Mengupdate buku
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_date' => 'required|date',
        ]);

        $book->update([
            'title' => $request->title,
            'author' => $request->author,
            'published_date' => $request->published_date,
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
