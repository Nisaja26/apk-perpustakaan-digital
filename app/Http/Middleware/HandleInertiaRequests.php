<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    // pada method share kita menambahkan beberapa key dalam array auth
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                // yang pertama ada key permissions
                'permissions' => $request->user() ? $request->user()->getUserPermissions() : [],
            ],
            // pada kode diatas, key permission melakukan pengecekan apakah user sedang login
            //  jika true maka tampilkan data permission yang dimiliki user menggunakkan method getuserpermissions
            // jika false akan menampilkan empty array
        ];
    }
}
