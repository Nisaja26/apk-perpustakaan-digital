// impor komponent tampilan logo aplikasi
import ApplicationLogo from '@/Components/ApplicationLogo';

// komponen dropdown yang digunakan untuk menampilkan menu user
import Dropdown from '@/Components/Dropdown';

// untuk membuat tautan navigasi di bagian desktop.
import NavLink from '@/Components/NavLink';

// untuk tautan navigasi di versi mobile
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

// fungsi Link dan hook usePage dari Inertia.js. 
// usePage digunakan untuk mengakses data yang diteruskan ke halaman, termasuk informasi pengguna yang terautentikasi.
import { Link, usePage } from '@inertiajs/react';

// untuk menangani state lokal
import { useState } from 'react';

// fungsi yang memeriksa apakah pengguna memiliki izin tertentu
import hasAnyPermission from '@/Utils/Permissions';

// children adalah konten utama halaman yang akan ditampilkan di bawah navigasi
export default function AuthenticatedLayout({ header, children }) {

    // Mengakses informasi pengguna dari props yang diteruskan oleh Inertia.js, 
    // yang mencakup data pengguna yang terautentikasi.
    const user = usePage().props.auth.user;

    // mengelola apakah menu dropdown navigasi di versi mobile ditampilkan atau tidak.
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

{/* NavLink untuk menampilkan tautan navigasi yang bisa diakses di layar desktop.
NavLink memeriksa apakah halaman saat ini sesuai dengan rute yang diberikan
asAnyPermission digunakan untuk memeriksa apakah pengguna memiliki izin untuk mengakses halaman tertentu, seperti halaman Permissions.
*/}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>

                                {hasAnyPermission(['permissions index']) &&
                                    <NavLink href={route('permissions.index')} active={route().current('permissions*')}>
                                        Permissions
                                    </NavLink>
                                }
                            </div>
                        </div>

                        {/* Dropdown: Menampilkan dropdown ketika pengguna mengklik nama
                            berisi tautan untuk mengedit profil atau keluar dari aplikasi (logout).
                            di-render hanya untuk pengguna yang sudah terautentikasi.
                        */}

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                      

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {hasAnyPermission(['permissions index']) &&
                            <ResponsiveNavLink href={route('permissions.index')} active={route().current('permissions*')}>
                                Permissions
                            </ResponsiveNavLink>
                        }
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
// Kode ini mendefinisikan layout halaman untuk pengguna yang sudah terautentikasi dengan elemen navigasi yang responsif.
// Navigasi di desktop dan mobile dikendalikan dengan komponen NavLink dan ResponsiveNavLink, serta dropdown menu untuk pengguna.
// Penggunaan Inertia.js memungkinkan interaksi halaman tanpa perlu melakukan refresh halaman sepenuhnya, memberikan pengalaman pengguna yang lebih halus.