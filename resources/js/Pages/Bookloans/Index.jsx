import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { bookLoans, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Book Loans</h2>}
        >
            <Head title={'Book Loans'} />
            <Container>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['bookloans create']) &&
                        <Button type={'add'} url={route('bookloans.create')} />
                    }
                    <div className='w-full md:w-4/6'>
                        <Search url={route('bookloans.index')} placeholder={'Search book loans...'} filter={filters} />
                    </div>
                </div>
                <Table.Card title={'Book Loans'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Nama</Table.Th>
                                <Table.Th>Buku</Table.Th>
                                <Table.Th>Waktu Pinjam</Table.Th>
                                <Table.Th>Pengembalian</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {bookLoans.data.map((bookloan, i) => (
                                <tr key={i}>
                                    <Table.Td>{++i + (bookLoans.current_page - 1) * bookLoans.per_page}</Table.Td>
                                    <Table.Td>{bookloan.user.name}</Table.Td>
                                    <Table.Td>{bookloan.book.title}</Table.Td>
                                    <Table.Td>{new Date(bookloan.date_loan).toLocaleDateString()}</Table.Td>
                                    <Table.Td>{bookloan.date_return ? new Date(bookloan.date_return).toLocaleDateString() : '-'}</Table.Td>
                                    <Table.Td>{bookloan.state}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['bookloans edit']) &&
                                                <Button type={'edit'} url={route('bookloans.edit', bookloan.id)} />
                                            }
                                            {hasAnyPermission(['bookloans delete']) &&
                                                <Button type={'delete'} url={route('bookloans.destroy', bookloan.id)} />
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {bookLoans.last_page !== 1 && (<Pagination links={bookLoans.links} />)}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
