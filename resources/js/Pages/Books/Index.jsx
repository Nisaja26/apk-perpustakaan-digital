import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Container from "@/Components/Container";
import Table from "@/Components/Table";
import Button from "@/Components/Button";
import Pagination from "@/Components/Pagination";
import { Head, usePage } from "@inertiajs/react";
import Search from "@/Components/Search";
import hasAnyPermission from "@/Utils/Permissions";

export default function Index({ auth }) {
    // Mengambil data books dan filters dari props
    const { books, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Buku
                </h2>
            }
        >
            <Head title={"Buku"} />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(["books create"]) && (
                        <Button type={"add"} url={route("books.create")} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route("books.index")}
                            placeholder={"Cari data buku berdasarkan judul..."}
                            filter={filters}
                        />
                    </div>
                </div>
                <Table.Card title={"Buku"}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Buku</Table.Th>
                                <Table.Th>Koleksi</Table.Th>
                                <Table.Th>Kategori</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {books.data.map((book, i) => (
                                <tr key={book.id}>
                                    <Table.Td>
                                        {++i + (books.current_page - 1) * books.per_page}
                                    </Table.Td>
                                    <Table.Td>
                                        {book.title}
                                        <div className="text-sm text-gray-400">
                                            {book.author}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="text-sm text-gray-400">
                                            {book.collection && book.collection.name
                                                ? book.collection.name
                                                : 'Tidak ada koleksi'}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="text-sm text-gray-400">
                                            {book.category && book.category.name
                                                ? book.category.name
                                                : 'Tidak ada kategori'}
                                        </div>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission(["books edit"]) && (
                                                <Button type={"edit"} url={route("books.edit", book.id)} />
                                            )}
                                            {hasAnyPermission(["books delete"]) && (
                                                <Button type={"delete"} url={route("books.destroy", book.id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex items-center justify-center">
                    {books.last_page !== 1 && <Pagination links={books.links} />}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
