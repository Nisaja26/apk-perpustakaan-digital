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

    // Destruct collections dan filters dari props, dengan fallback default
    const { collections = { data: [], current_page: 1, per_page: 10, last_page: 1, links: [] }, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Collections</h2>}
        >
            <Head title={'Collections'} />
            <Container>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['collections create']) &&
                        <Button type={'add'} url={route('collections.create')} />
                    }
                    <div className='w-full md:w-4/6'>
                        <Search url={route('collections.index')} placeholder={'Search collections by name...'} filter={filters} />
                    </div>
                </div>
                <Table.Card title={'Collections'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Collection Name</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {(collections.data || []).map((collection, i) => (
                                <tr key={collection.id}>
                                    <Table.Td>{++i + (collections.current_page - 1) * collections.per_page}</Table.Td>
                                    <Table.Td>{collection.name}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['collections edit']) &&
                                                <Button type={'edit'} url={route('collections.edit', collection.id)} />}
                                            {hasAnyPermission(['collections delete']) &&
                                                <Button type={'delete'} url={route('collections.destroy', collection.id)} />}
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {collections.last_page !== 1 && (<Pagination links={collections.links} />)}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
