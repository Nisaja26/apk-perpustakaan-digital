import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import { Head, usePage } from '@inertiajs/react';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { reviews, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Reviews</h2>}
        >
            <Head title="Reviews" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['reviews create']) && (
                        <Button type={'add'} url={route('reviews.create')} />
                    )}
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('reviews.index')}
                            placeholder={'Cari judul buku...'}
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Daftar Review">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Judul Buku</Table.Th>
                                <Table.Th>Nama User</Table.Th>
                                <Table.Th>Komentar</Table.Th>
                                <Table.Th>Rating</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {reviews.data.map((review, i) => (
                                <tr key={review.id}>
                                    <Table.Td>{++i + (reviews.current_page - 1) * reviews.per_page}</Table.Td>
                                    <Table.Td>{review.book?.title ?? 'Tidak diketahui'}</Table.Td>
                                    <Table.Td>{review.user?.name ?? 'Anonim'}</Table.Td>
                                    <Table.Td>{review.comment}</Table.Td>
                                    <Table.Td>{review.rating}/5</Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            
                                            {hasAnyPermission(['reviews delete']) && (
                                                <Button
                                                    type="delete"
                                                    url={route('reviews.destroy', review.id)}
                                                />
                                            )}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex items-center justify-center mt-6">
                    {reviews.last_page !== 1 && <Pagination links={reviews.links} />}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
