import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyCollection from '@/Utils/Collections'; // pastikan ini aktif

export default function Index({ auth }) {
    const { collections, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Collections</h2>
            }
        >
            <Head title="Collections" />

            <Container>
                {/* Top Bar: Add Button + Search */}
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyCollection(['collections create']) && (
                        <Button type="add" url={route('collections.create')} />
                    )}

                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('collections.index')}
                            placeholder="Search collections data by name..."
                            filter={filters}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <Table.Card title="Collections">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Collections Name</Table.Th>
                                <Table.Th>Total Books</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {collections.data.map(({ id, name, books }, index) => (
                                <tr key={id}>
                                    <Table.Td>
                                        {++index + (collections.current_page - 1) * collections.per_page}
                                    </Table.Td>
                                    <Table.Td>{name}</Table.Td>
                                    <Table.Td>{books.length}</Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyCollection(['collections edit']) && (
                                                <Button type="edit" url={route('collections.edit', id)} />
                                            )}
                                            {hasAnyCollection(['collections delete']) && (
                                                <Button type="delete" url={route('collections.destroy', id)} />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                {/* Pagination */}
                {collections.last_page !== 1 && (
                    <div className="flex items-center justify-center mt-4">
                        <Pagination links={collections.links} />
                    </div>
                )}
            </Container>
        </AuthenticatedLayout>
    );
}
