// untuk menggunkkan fitur react
import React from 'react'
// untuk menampilkan bagian navigasi dan struktur halaman 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// impor container untuk membungkus tampilan
import Container from '@/Components/Container';
// tapilkan data dalam bentuk tabel
import Table from '@/Components/Table';
// untuk membuat tombol
import Button from '@/Components/Button';
// menangani navigasi halaman yang panjang
import Pagination from '@/Components/Pagination';
// ead untuk mengatur title halaman dan usePage untuk mengakses props hal inertia.js
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
    const { permissions,filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Permissions</h2>}
        >
            <Head title={'Permissions'}/>
            <Container>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['permissions create']) &&
                        <Button type={'add'} url={route('permissions.create')}/>
                    }
                    <div className='w-full md:w-4/6'>
                        <Search url={route('permissions.index')} placeholder={'Search permissions data by name...'} filter={filters}/>
                    </div>
                </div>
                <Table.Card title={'Permissions'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Permissions Name</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {permissions.data.map((permission, i) => (
                                <tr key={i}>
                                    <Table.Td>{++i + (permissions.current_page-1) * permissions.per_page}</Table.Td>
                                    <Table.Td>{permission.name}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['permissions edit']) &&
                                                <Button type={'edit'} url={route('permissions.edit', permission.id)}/>
                                            }
                                            {hasAnyPermission(['permissions delete']) &&
                                                <Button type={'delete'} url={route('permissions.destroy', permission.id)}/>
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>
                <div className='flex items-center justify-center'>
                    {permissions.last_page !== 1 && (<Pagination links={permissions.links}/>)}
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}
// Kode ini membuat halaman daftar permissions yang terdiri dari tabel dengan data permissions, fitur pencarian, dan pagination.
// Menggunakan Inertia.js untuk mengelola rute dan mempermudah pengambilan data dari backend.
// Setiap aksi (seperti menambah, mengedit, atau menghapus permission) dilindungi dengan pengecekan izin, memastikan hanya pengguna yang memiliki hak akses yang dapat melakukan tindakan tertentu.