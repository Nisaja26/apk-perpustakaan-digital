// untuk menggunkan fitur react
import React from 'react'
// untuk menampilkan bagian navigasi dan struktur halaman 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// impor container untuk membungkus tampilan
import Container from '@/Components/Container';
// tampilkan data dalam bentuk tabel
import Table from '@/Components/Table';
// untuk membuat tombol
import Button from '@/Components/Button';
// menangani navigasi halaman yang panjang
import Pagination from '@/Components/Pagination';
// head untuk mengatur title halaman dan usePage untuk mengakses props hal inertia.js
import { Head, usePage } from '@inertiajs/react';
// fitur pencaharian
import Search from '@/Components/Search';
// cek izin user
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({auth}) {

    // destruct permissions props
    // mengambil data permissions dan filters dari props 
    // permissions berisi daftar izin
    // filters isi informasi terkait pencaharian
    const { books, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Books</h2>}
        >
            <Head title={'Books'} />
            <Container>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['books create']) && 
                        <Button type={'add'} url={route('books.create')} />
                    }
                    <div className='w-full md:w-4/6'>
                        <Search url={route('books.index')} placeholder={'Search books data by title...'} filter={filters} />
                    </div>
                </div>
                <Table.Card title={'Books'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Author</Table.Th>
                                <Table.Th>Published Year</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {books.data.map((book, i) => (
                                <tr key={i}>
                                    <Table.Td>{++i + (books.current_page - 1) * books.per_page}</Table.Td>
                                    <Table.Td>{book.title}</Table.Td>
                                    <Table.Td>{book.author}</Table.Td>
                                    <Table.Td>{book.published_year}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['books edit']) && 
                                                <Button type={'edit'} url={route('books.edit', book.id)} />
                                            }
                                            {hasAnyPermission(['books delete']) && 
                                                <Button type={'delete'} url={route('books.destroy', book.id)} />
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {books.last_page !== 1 && (<Pagination links={books.links} />)}
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}
