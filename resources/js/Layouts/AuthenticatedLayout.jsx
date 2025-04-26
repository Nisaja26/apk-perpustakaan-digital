// Import logo aplikasi
import ApplicationLogo from "@/Components/ApplicationLogo";

// komponen untuk dropdown, navigasi link, dan navigasi responsif
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

// untuk membuat navigasi yang terhubung ke halaman lain menggunakan Inertia.js.  usePage digunakan untuk mengakses informasi halaman dan data pengguna.
import { Link, usePage } from "@inertiajs/react";

// untuk menyimpan dan mengelola state, digunakan di sini untuk toggle (menyembunyikan/menampilkan) dropdown navigasi
import { useState } from "react";

// ntuk memeriksa apakah pengguna memiliki izin tertentu, mungkin untuk mengakses halaman yang berbeda berdasarkan peran pengguna
import hasAnyPermission from "@/Utils/Permissions";

// semua yang ada di navigasi
export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        // bagian navbar
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        {/* logo aplikasi dan menu navigasi */}
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* tombol link page dan judul */}
                            <div className="hidden sm:flex sm:space-x-8 sm:-my-px sm:ms-10">
                                {/* Home Link */}
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-purple-400 hover:text-white transition-all duration-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" />
                                    </svg>
                                    <span>Home</span>
                                </NavLink>



                                {/* SISTEM NAVIGASI */}
                                {/* Permissions Link */}
                                {hasAnyPermission(["permissions index"]) && (
                                    <NavLink
                                        href={route("permissions.index")}
                                        active={route().current("permissions*")}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-purple-400 hover:text-white transition-all duration-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 0m-7 4v12m-7-8h14" />
                                        </svg>
                                        <span>Permissions</span>
                                    </NavLink>
                                )}

                                {/* Roles Link */}
                                {hasAnyPermission(["roles index"]) && (
                                    <NavLink
                                        href={route("roles.index")}
                                        active={route().current("roles*")}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-purple-400 hover:text-white transition-all duration-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.5 0 2-1.5 2-2s-.5-2-2-2-2 1.5-2 2 0 2 .5 2zM5 21h14M19 3h-1V2h-2v1H8V2H6v1H5c-1 0-1 1-1 1v18c0 1 1 1 1 1h14c1 0 1-1 1-1V4c0-1-1-1-1-1z" />
                                        </svg>
                                        <span>Roles</span>
                                    </NavLink>
                                )}

                                {hasAnyPermission(['users index']) &&
                                    <NavLink
                                        href={route('users.index')}
                                        active={route().current('users*')}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-purple-400 hover:text-white transition-all duration-400"

                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM5 21h14c0-2-2-3-4-3s-4 1-4 3H9c0-2-2-3-4-3s-4 1-4 3z" />
                                        </svg>

                                        <span>Users</span>
                                    </NavLink>
                                }

                                {hasAnyPermission(["collections index"]) && (
                                    <NavLink
                                        href={route("collections.index")}
                                        active={route().current("collections*")}
                                        className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-purple-400 hover:text-white transition-all duration-400"
                                    >
                                        {/* Ikon buku */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4c0-.552-.447-1-1-1H5c-.553 0-1 .448-1 1v16c0 .552.447 1 1 1h6c.553 0 1-.448 1-1v-2m0-12h7c.553 0 1 .448 1 1v14c0 .552-.447 1-1 1h-7m0-16v16" />
                                        </svg>
                                        <span>Collections</span>
                                    </NavLink>
                                )}

                                <NavLink
                                    href={route("categories.index")}
                                    active={route().current("categories*")}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-purple-400 hover:text-white transition-all duration-400"
                                >
                                    {/* Ikon Buku Terbuka */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-1.5-1-3-1-4.5-1S4.5 5 3 6v12c1.5-1 3-1 4.5-1S10.5 17 12 18m0-12c1.5-1 3-1 4.5-1s3 .5 4.5 1v12c-1.5-1-3-1-4.5-1s-3 .5-4.5 1" />
                                    </svg>
                                    <span>Categories</span>
                                </NavLink>

                                <NavLink
                                    href={route("books.index")}
                                    active={route().current("books*")}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-purple-400 hover:text-white transition-all duration-400"
                                >
                                    {/* Ikon Buku dengan Lembaran */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18c1 0 1 1 1 1v16c0 1-1 1-1 1H3c-1 0-1-1-1-1V4c0-1 1-1 1-1z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 11h18M3 15h18M3 19h18" />
                                    </svg>
                                    <span>Books</span>
                                </NavLink>



                            </div>


                        </div>

                        {/* dorpdown user, tampil nama pengguna yang sedang login, berisi pilihan profile edit / logout  */}
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
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* tampilan untuk aplikasi mobile */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
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
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
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
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >

                    {/* TAMPILAN NAVIGASI */}
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard


                        </ResponsiveNavLink>
                        {hasAnyPermission(["permissions index"]) && (
                            <ResponsiveNavLink
                                href={route("permissions.index")}
                                active={route().current("permissions*")}
                            >
                                Permissions
                            </ResponsiveNavLink>
                        )}

                        {hasAnyPermission(["roles index"]) && (
                            <ResponsiveNavLink
                                href={route("roles.index")}
                                active={route().current("roles*")}
                            >
                                Roles
                            </ResponsiveNavLink>
                        )}

                        {/* berbeda pakai kutip 1 */}
                        {hasAnyPermission(['users index']) &&
                            <ResponsiveNavLink
                                href={route('users.index')}
                                active={route().current('users*')}>

                                Users
                            </ResponsiveNavLink>
                        }



                        {hasAnyPermission(["collections index"]) && (
                            <ResponsiveNavLink
                                href={route("collections.index")}
                                active={route().current("collections*")}
                            >
                                Collections
                            </ResponsiveNavLink>
                        )}

                        {hasAnyPermission(["categories index"]) && (
                            <ResponsiveNavLink
                                href={route("categories.index")}
                                active={route().current("categories*")}
                            >
                                Categories
                            </ResponsiveNavLink>
                        )}

                        {hasAnyPermission(["books index"]) && (
                            <ResponsiveNavLink
                                href={route("books.index")}
                                active={route().current("books*")}
                            >
                                Books
                            </ResponsiveNavLink>
                        )}




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
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav >
            {/* Pada tampilan mobile, menu navigasi tersembunyi hingga pengguna mengklik tombol menu (hamburger icon) untuk menampilkan dropdown navigasi. Di sini, showingNavigationDropdown
            dikendalikan untuk menyembunyikan atau menampilkan daftar navigasi. Dropdown menu navigasi hanya muncul ketika showingNavigationDropdown bernilai true */}

            {/* Bagian header memungkinkan kita untuk menampilkan elemen header yang dapat disesuaikan dengan props header yang diberikan. 
            Konten utama (<main>{children}</main>) menampilkan konten halaman yang diberikan oleh komponen induk, yang dapat berupa apa saja sesuai kebutuhan halaman yang sedang ditampilkan.
             */}
            {
                header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )
            }

            <main>{children}</main>
        </div >
    );
}
// Layout ini dirancang untuk aplikasi web dengan navigasi responsif yang hanya menunjukkan opsi menu yang relevan berdasarkan izin pengguna.
//  Menggunakan Tailwind CSS untuk styling, Inertia.js untuk routing, dan React untuk manajemen state dan komponen UI, layout ini memberikan pengalaman pengguna yang interaktif dan dinamis,
//  terutama dalam hal navigasi dan pengelolaan sesi pengguna.



