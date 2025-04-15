<?php

namespace App\Http\Controllers;

use App\Models\Book;
use CreateBooksTable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission;

class BookController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('books:books index', only: ['index']),
            new Middleware('books:books create', only: ['create', 'store']),
            new Middleware('books:books edit', only: ['edit', 'update']),
            new Middleware('books:books delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //  get permissions
        $permissions = Book::select('id', 'name')
            ->when($request->search,fn($search) => $search->where('name', 'like', '%'.$request->search.'%'))
            ->latest()
            ->paginate(6)->withQueryString();

        // render view
        return inertia('Books/Index', ['books' => $permissions,'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // render view
        return inertia('Permissions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions']);

        // create new permission data
        Permission::create(['name' => $request->name]);

        // render view
        return to_route('permissions.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        // render view
        return inertia('Permissions/Edit', ['permission' => $permission]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        // validate request
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions,name,'.$permission->id]);

        // update permission data
        $permission->update(['name' => $request->name]);

        // render view
        return to_route('permissions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        // delete permissions data
        $permission->delete();

        // render view
        return back();
    }
}