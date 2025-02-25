<?php

// tampilan profil edit

// lokasi file
namespace App\Http\Controllers;
// kelas yang akan membantu dalam pengelolaan profil pengguna
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

// untuk menangani berbagai aksi terkait profil pengguna,
//  seperti menampilkan formulir edit profil, memperbarui data pengguna, dan menghapus akun pengguna.
class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    // formulir edit profi
    // menampilkan halaman formulir profil pengguna yang dapat diedit.
    public function edit(Request $request): Response
    {
        // Menampilkan halaman edit profil menggunakan Inertia.js
        return Inertia::render('Profile/Edit', [
            // untuk memeriksa apakah pengguna perlu memverifikasi email mereka.
            //  Jika pengguna membutuhkan verifikasi email, maka ini akan bernilai true.
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            // Mengambil status dari sesi untuk menampilkan pesan sukses atau error
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    // perbarui profil pengguna
    //  untuk memvalidasi data yang dikirimkan oleh pengguna
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        // Mengisi data pengguna yang akan diperbarui dengan data yang telah divalidasi dari form
        $request->user()->fill($request->validated());

        // Mengecek apakah pengguna mengubah alamat email mereka. Jika ya, maka kolom email_verified_at disetel ke null 
        // untuk menghapus status verifikasi email lama, karena email baru harus diverifikasi lagi
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        //  Menyimpan perubahan ke dalam database
        $request->user()->save();

        // Setelah berhasil mengupdate profil, pengguna akan diarahkan kembali ke halaman edit profil
        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    // penghapusan akun pengguna
    public function destroy(Request $request): RedirectResponse
    {
        //pengguna memasukkan kata sandi yang benar sebagai langkah konfirmasi untuk menghapus akun.
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        //  pengguna dari sesi mereka setelah menghapus akun
        Auth::logout();

        // Menghapus data pengguna dari database
        $user->delete();

        // Menghentikan sesi pengguna, memastikan bahwa data sesi pengguna dihapus
        $request->session()->invalidate();
        // Menghasilkan token CSRF baru untuk mencegah serangan CSRF.
        $request->session()->regenerateToken();

        //  Setelah penghapusan akun, pengguna diarahkan ke halaman utama.
        return Redirect::to('/');
    }
}
