<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Collection;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;


class BookController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:books index', only: ['index']),
            new Middleware('permission:books create', only: ['create', 'store']),
            new Middleware('permission:books edit', only: ['edit', 'update']),
            new Middleware('permission:books delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Mengambil buku tanpa eager loading
        $books = Book::select('id', 'title', 'author', 'publication_year', 'category_id', 'collection_id')
            ->when($request->search, fn($search) => $search->where('title', 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate(6)
            ->withQueryString();

        // Lazy load untuk category dan collection setelah query utama
        // lazy load ini akan memanggil data jika diperlukan saja
        $books->load(['category', 'collection']);

        // Render view
        return inertia('Books/Index', [
            'books' => $books,
            'filters' => $request->only(['search'])
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Books/Create', [
            'collections' => Collection::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publication_year' => 'required|digits:4|integer|min:1500|max:' . date('Y'),
            'category_id' => 'required|exists:categories,id',
            'collection_id' => 'required|exists:collections,id',
        ]);


        $book = Book::create($request->all());
        return redirect()->route('books.index');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return inertia('Books/Edit', [
            'book' => $book, // ini penting!
            'collections' => Collection::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publication_year' => 'required|digits:4|integer|min:1500|max:' . date('Y'),
            'category_id' => 'required|exists:categories,id',
            'collection_id' => 'required|exists:collections,id',
        ]);

        $book->update($request->all());

        return redirect()->route('books.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        // delete permissions data
        $book->delete();

        // render view
        return back();
    }
}