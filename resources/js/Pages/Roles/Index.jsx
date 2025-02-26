// menggunakkan fitur react
import React from "react";
// untuk menampilkan navigasi dan struktur halaman
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// untuk membungkus tampilan
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";
// izin pengguna untuk mengakses
import hasAnyPermission from "@/Utils/Permissions";


export default function Index({ auth }) {
    // destruct permissions props
    const { roles ,filters} = usePage().props;

    return (
        // halaman hanya dapat diakses oleh user yang ter authtentikasi
        <AuthenticatedLayout
            user={auth.user}
            // menampilkan judul halaman
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Roles
                </h2>
            }
        >
            {/* inertia.js mengatur title halaman */}
            <Head title={"Roles"} />

            {/* membungkus halaman  */}
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {/* button muncul jika user telah memiliki izin akses */}
                    {hasAnyPermission(["roles create"]) && (
                        <Button type={"add"} url={route("roles.create")} />
                    )}
                    <div className="w-full md:w-4/6">
                    {/* pencaharian dengan nama role */}
                        <Search
                            url={route("roles.index")}
                            placeholder={"Search roles data by name..."}
                            filter={filters}
                        />
                    </div>
                </div>

                {/* tampilan tabel daftar roles */}
                <Table.Card title={"Roles"}>
                    <Table>
                        {/* Menentukan kolom-kolom tabel */}
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Role Name</Table.Th>
                                <Table.Th>Permissions</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>

                        {/* Menampilkan data roles dalam bentuk baris tabel */}
                        <Table.Tbody>
                            {roles.data.map((role, i) => (
                                <tr key={i}>
                                    <Table.Td>
                                        {++i +
                                            (roles.current_page - 1) *
                                                roles.per_page}
                                    </Table.Td>
                                    <Table.Td>{role.name}</Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {role.name == "super-admin" ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700">
                                                    all-permissions
                                                </span>
                                            ) : (
                                                role.permissions.map(
                                                    (permission, i) => (
                                                        <span
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700"
                                                            key={i}
                                                        >
                                                            {role.name ==
                                                            "super-admin"
                                                                ? "all-permissions"
                                                                : permission.name}
                                                        </span>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission([
                                                "roles edit",
                                            ]) && (
                                                <Button
                                                    type={"edit"}
                                                    url={route(
                                                        "roles.edit",
                                                        role.id
                                                    )}
                                                />
                                            )}
                                            {hasAnyPermission([
                                                "roles delete",
                                            ]) && (
                                                <Button
                                                    type={"delete"}
                                                    url={route(
                                                        "roles.destroy",
                                                        role.id
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

                {/* Jika jumlah halaman terakhir (roles.last_page) lebih dari 1, maka komponen Pagination akan ditampilkan.
                 Komponen ini memungkinkan navigasi antar halaman dalam data roles */}
                <div className="flex items-center justify-center">
                    {roles.last_page !== 1 && (
                        <Pagination links={roles.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
// Komponen ini adalah bagian dari antarmuka pengguna yang menangani tampilan roles dalam aplikasi berbasis Laravel dan Inertia.js. Beberapa fitur utama dari komponen ini adalah:
// Menampilkan daftar roles dengan opsi untuk mengedit dan menghapus.
// Pengguna dapat mencari role dengan menggunakan fitur pencarian.
// Pengguna dengan izin yang tepat dapat membuat, mengedit, dan menghapus role.
// Data ditampilkan dalam tabel yang dipisahkan dengan paginasi.