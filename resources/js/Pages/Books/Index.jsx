import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { books, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Books</h2>}
        >
            <Head title="Books" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['books create']) &&
                        <Button type="add" url={route('books.create')} />
                    }
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('books.index')}
                            placeholder="Search books by title..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Books List">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Judul</Table.Th>
                                <Table.Th>Tahun</Table.Th>
                                <Table.Th>Koleksi</Table.Th>
                                <Table.Th>Kategori</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {books.data.map((book, index) => (
                                <tr key={book.id}>
                                    <Table.Td>{++index + (books.current_page - 1) * books.per_page}</Table.Td>
                                    <Table.Td>
                                    <div className="flex flex-col">
    <span className="font-medium">{book.title}</span>
    <span className="text-sm text-indigo-600 italic flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
        </svg>
        {book.author}
    </span>
</div>

                                    </Table.Td>
                                    <Table.Td>{book.publication_year}</Table.Td>
                                    <Table.Td>{book.collection ? book.collection.name : '-'}</Table.Td>
                                    <Table.Td>{book.category ? book.category.name : '-'}</Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission(['books edit']) &&
                                                <Button type="edit" url={route('books.edit', book.id)} />
                                            }
                                            {hasAnyPermission(['books delete']) &&
                                                <Button type="delete" url={route('books.destroy', book.id)} />
                                            }
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
