<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Collection; // Mengimpor model Collection untuk mengelola koleksi buku
use App\Models\Category; // Mengimpor model Category untuk mengelola kategori buku
use Illuminate\Http\Request; // Mengimpor Request untuk menangani input dari pengguna
// use Spatie\Permission\Models\Role; // Mengimpor Role model jika dibutuhkan untuk manajemen role (opsional)
use Illuminate\Routing\Controllers\Middleware; // Mengimpor middleware untuk kontrol akses
use Illuminate\Routing\Controllers\HasMiddleware; // Mengimpor HasMiddleware untuk implementasi middleware pada controller

class BookController extends Controller implements HasMiddleware
{
    // Method untuk mendefinisikan middleware yang diterapkan pada setiap action controller
    public static function middleware()
    {
        return [ 
            // Membatasi akses untuk action 'index' hanya bagi user dengan permission 'books index'
            new Middleware('permission:books index', only: ['index']),
            // Membatasi akses untuk action 'create' dan 'store' hanya bagi user dengan permission 'books create'
            new Middleware('permission:books create', only: ['create', 'store']),
            // Membatasi akses untuk action 'edit' dan 'update' hanya bagi user dengan permission 'books edit'
            new Middleware('permission:books edit', only: ['edit', 'update']),
            // Membatasi akses untuk action 'destroy' hanya bagi user dengan permission 'books delete'
            new Middleware('permission:books delete', only: ['destroy']),
        ];
    }

    // Menampilkan daftar buku
    public function index(Request $request)
    {
        // Mengambil semua buku, termasuk data kategori dan koleksi yang terkait, serta mendukung fitur pencarian
        $books = Book::with(['collection', 'category']) // Mengambil buku dengan relasi 'category' dan 'collection'
            ->when(request('search'), fn($query) => $query->where('title', 'like', '%'.request('search').'%')) // Menambahkan filter pencarian berdasarkan judul
            ->latest() // Mengurutkan buku berdasarkan data terbaru
            ->paginate(6); // Menampilkan 6 buku per halaman dengan pagination

        // Mengembalikan tampilan 'Books/Index' dengan data buku dan filter pencarian
        return inertia('Books/Index', ['books' => $books, 'filters' => $request->only(['search'])]);
    }

    // Menampilkan form untuk membuat buku baru
    public function create()
    {
        // Mengambil semua kategori dan koleksi yang tersedia
        $collections = Collection::latest()->get(); // Mengambil semua koleksi berdasarkan urutan terbaru
        $categories = Category::latest()->get(); // Mengambil semua kategori berdasarkan urutan terbaru
        

        // Mengembalikan tampilan 'Books/Create' dengan data kategori dan koleksi yang tersedia
        return inertia('Books/Create', ['collections' => $collections, 'categories' => $categories]);
    }

    // Menyimpan buku baru ke dalam database
    public function store(Request $request)
{
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|integer',
            'collection_id' => 'required|exists:collections,id',
            'category_id' => 'required|exists:categories,id',
        ]);
        
        // Simpan data buku ke database
        Book::create($validatedData);
    
        // Redirect atau response sesuai kebutuhan
        return redirect()->route('books.index')->with('success', 'Buku berhasil ditambahkan.');
    }
}

    // Menampilkan halaman untuk mengedit data buku
    public function edit(Book $book)
    {
        // Mengambil semua kategori dan koleksi yang tersedia
        $collections = Collection::latest()->get(); // Mengambil semua koleksi berdasarkan urutan terbaru
        $categories = Category::latest()->get(); // Mengambil semua kategori berdasarkan urutan terbaru
       

        // Mengembalikan tampilan 'Books/Edit' dengan data buku yang akan diedit, beserta kategori dan koleksi
        return inertia('Books/Edit', ['book' => $book, 'collections' => $collections, 'categories' => $categories]);
    }

    // Memperbarui data buku yang sudah ada
    public function update(Request $request, Book $book)
    {
        // Validasi input dari request
        $request->validate([
            'title' => 'required|min:3|max:255', // Validasi judul buku: harus ada, minimal 3 karakter, maksimal 255 karakter
            'author' => 'required|min:3|max:255', // Validasi penulis buku: harus ada, minimal 3 karakter, maksimal 255 karakter
            'published_year' => 'required|integer|min:1900|max:2025', // Validasi tahun terbit: harus ada, dalam rentang 1900-2025
            'collection_id' => 'required|exists:collections,id', // Validasi koleksi: harus ada dan sesuai dengan ID koleksi yang ada
            'category_id' => 'required|exists:categories,id', // Validasi kategori: harus ada dan sesuai dengan ID kategori yang ada
            
        ]);

        // Memperbarui data buku dengan data yang diterima dari form
        $book->update([
            'title' => $request->title, // Memperbarui judul buku
            'author' => $request->author, // Memperbarui nama penulis
            'published_year' => $request->published_year, // Memperbarui tahun terbit
            'collection_id' => $request->collection_id, // Memperbarui ID koleksi
            'category_id' => $request->category_id, // Memperbarui ID kategori
        ]);

        // Mengarahkan kembali ke halaman daftar buku setelah buku diperbarui
        return to_route('books.index');
    }

    // Menghapus buku dari database
    public function destroy(Book $book)
    {
        // Menghapus buku dari database
        $book->delete();

        // Mengarahkan kembali ke halaman sebelumnya setelah buku dihapus
        return back();
    }
}
