<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Models\BookLoan;

class BookLoanController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        // mengatur hak akses
        return [
            new Middleware('permission:bookloans index', only: ['index']),
            new Middleware('permission:bookloans create', only: ['create', 'store']),
            new Middleware('permission:bookloans edit', only: ['edit', 'update']),
            new Middleware('permission:bookloans delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // relasi ke user dan book
        $bookLoans = BookLoan::with('book', 'user')
            ->when($request->search, function ($query) use ($request) {
                $query->whereHas('user', function ($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%');
                })->orWhereHas('book', function ($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->search . '%');
                });
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return inertia('BookLoans/Index', [
            'bookLoans' => $bookLoans,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('BookLoans/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'date_loan' => 'required|date',
            'date_return' => 'nullable|date|after_or_equal:date_loan',
            'state' => 'required|string|max:50',
        ]);

        BookLoan::create($request->only([
            'book_id',
            'user_id',
            'date_loan',
            'date_return',
            'state',
        ]));

        return to_route('bookloans.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookLoan $bookLoan)
    {
        return inertia('BookLoans/Edit', [
            'bookLoan' => $bookLoan->load('book', 'user'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookLoan $bookLoan)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'user_id' => 'required|exists:users,id',
            'date_loan' => 'required|date',
            'date_return' => 'nullable|date|after_or_equal:date_loan',
            'state' => 'required|string|max:50',
        ]);

        $bookLoan->update($request->only([
            'book_id',
            'user_id',
            'date_loan',
            'date_return',
            'state',
        ]));

        return to_route('bookloans.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookLoan $bookLoan)
    {
        $bookLoan->delete();

        return back();
    }
}
