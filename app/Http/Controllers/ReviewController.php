<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
// use Spatie\Permission\Models\Permission;

class ReviewController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:reviews index', only: ['index']),
            new Middleware('permission:reviews create', only: ['create', 'store']),
            new Middleware('permission:reviews edit', only: ['edit', 'update']),
            new Middleware('permission:reviews delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $reviews = Review::with(['book', 'user'])
            ->when(
                $request->search,
                fn($q) =>
                $q->where('comment', 'like', '%' . $request->search . '%')
            )
            ->latest()
            ->paginate(6)
            ->withQueryString();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // render view
        return inertia('Reviews/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        Review::create([
            'user_id' => auth()->id(),
            'book_id' => $request->book_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        if (Review::where('book_id', $request->book_id)->where('user_id', auth()->id())->exists()) {
            return back()->withErrors(['error' => 'Kamu sudah memberikan review untuk buku ini.']);
        }
        

        return redirect()->route('books.show', $request->book_id)->with('success', 'Review berhasil ditambahkan!');
    }


    public function show(Book $book)
    {
        $reviews = $book->reviews()->with('user')->get();  // Ambil semua review dan relasi dengan user

        return inertia('Books/Show', [
            'book' => $book,  // Menyertakan data buku
            'reviews' => $reviews,  // Menyertakan data review buku
        ]);


    }

    public function destroy(Review $review)
    {
        $review->delete();
        return back()->with('success', 'Review berhasil dihapus!');
    }
    
}
