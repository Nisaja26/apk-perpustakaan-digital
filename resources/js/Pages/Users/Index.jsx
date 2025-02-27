// mengambil library react
import React from "react";
// menampilkan navigasi dan struktur halaman
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// membungkus konten dan beberapa konten
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
// menggunakkan inertia.js
import { Head, usePage } from "@inertiajs/react";
// Head: untuk mengatur header
// usePage: Hook dari Inertia.js untuk mengambil data dari halaman

// fitur pencaharian
import Search from "@/Components/Search";

// untuk memeriksa izin pengguna, seperti apakah mereka memiliki hak untuk membuat, mengedit, atau menghapus pengguna.
import hasAnyPermission from "@/Utils/Permissions";

//  untuk menampilkan daftar pengguna
export default function Index({ auth }) {
    // destruct users props
    // Mengambil data users dan filters
    const { users, filters } = usePage().props;
    // users berisi daftar pengguna dan filters berisi filter yang diterapkan pada pencarian.


    return (
        // AuthenticatedLayout digunakan untuk membungkus tampilan halaman yang hanya bisa diakses oleh pengguna yang sudah terautentikasi.
        //  Di sini juga ditampilkan header dengan judul "Users".
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            {/* Mengatur tag <title> untuk halaman */}
            <Head title={"Users"} />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(["users create"]) && (
                        // hanya untuk user yang memiliki akses
                        <Button type={"add"} url={route("users.create")} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route("users.index")}
                            placeholder={"Search users data by name..."}
                            filter={filters}
                        />
                    </div>
                </div>
                <Table.Card title={"users"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>User</Table.Th>
                                <Table.Th>Roles</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {/*  untuk mengiterasi melalui array */}
                            {users.data.map((user, i) => (
                                // untuk mengidentifikasi elemen yang sedang diproses.
                                // users.data, yang berisi data pengguna. Untuk setiap elemen user (yang mewakili seorang pengguna),
                                //  kita membuat baris <tr> baru. Variabel i adalah indeks saat ini dari array
                                <tr key={i}>
                                    <Table.Td>
                                        {/*  untuk menghitung nomor urut pengguna. */}
                                        {++i +
                                            (users.current_page - 1) *
                                            // Menghitung offset untuk halaman saat ini
                                                users.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {/* Menampilkan nama pengguna di dalam kolom tabel */}
                                        {user.name}
                                        <div className="text-sm text-gray-400">
                                            {/*  Menampilkan alamat email pengguna */}
                                            {user.email}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {/* untuk mengiterasi array roles dari objek user */}
                                            {user.roles.map((role, i) => (
                                                <span
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700"
                                                    key={i}
                                                >
                                                    {/*  Menampilkan nama peran pengguna */}
                                                    {role.name}
                                                </span>
                                            ))}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission([
                                                "users edit",
                                            ]) && (
                                                <Button
                                                    type={"edit"}
                                                    url={route(
                                                        "users.edit",
                                                        user.id
                                                    )}
                                                />
                                            )}
                                            {hasAnyPermission([
                                                "users delete",
                                            ]) && (
                                                <Button
                                                    type={"delete"}
                                                    url={route(
                                                        "users.destroy",
                                                        user.id
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex items-center justify-center">
                    {users.last_page !== 1 && (
                        <Pagination links={users.links} />
                    )}
                </div>
                {/* Menampilkan pagination jika jumlah halaman terakhir (last_page) lebih dari satu. */}
            </Container>
        </AuthenticatedLayout>
    );
}
// Kode ini adalah bagian dari aplikasi web yang menggunakan Inertia.js untuk mempermudah pengelolaan halaman dan interaksi dengan server tanpa reload halaman.
//  Halaman ini menampilkan daftar pengguna yang bisa dicari, diedit, dan dihapus berdasarkan izin yang diberikan kepada pengguna yang sedang aktif.
//  Kontrol akses dilakukan menggunakan fungsi hasAnyPermission untuk memastikan bahwa hanya pengguna dengan izin yang sesuai yang dapat melakukan aksi tertentu seperti menambah, mengedit, atau menghapus pengguna.