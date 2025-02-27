// Library utama untuk membuat komponen
import React ,{useEffect, useState }from 'react'
// untuk tampilan navigasi dan struktur halaman
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// membungkus konten
import Container from '@/Components/Container';
// mengatur header, form dan halaman
import { Head, useForm, usePage } from '@inertiajs/react';
// beberapa komponen
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
// memberikan notifikasi jika data berhasil di buat
import Swal from 'sweetalert2';
// mengambil komponen select
import Select2 from '@/Components/Select2';

// edit pengguna yang ada
export default function Edit({auth}) {

    // destruct roles and user from usepage props

    const { user, roles } = usePage().props;

    // define state with helper inertia
    // untuk mengelola form
    const { data, setData, post, errors } = useForm({
        // data user 
        name : user.name,
        email: user.email,
        // ketika pengguna memilih peran dari dropdown
        selectedRoles : user.roles.map(role => role.name),
        // untuk Menyimpan Data
        filterRole : user.roles.map(role => ({
            value: role.name,
            label: role.name
        })),
        _method: 'put'
    });

    const formattedRoles = roles.map(role => ({
        value: role.name,
        label: role.name
    }));



    // define method handleSelectedroles
    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map(option => option.value);
        setData('selectedRoles', selectedValues);
    }

    // define method handleUpdateData
    // pengeditan data
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('users.update', user.id), {
            onSuccess: () => {
                // pesan jika proses berhasil
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        // halaman hanya bisa di akses oleh user yang ter authtentikasi
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit User</h2>}
        >
            <Head title={'Create Users'}/>
            <Container>
                <Card title={'Create new user'}>
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                            <Input label={'Name'} type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input name user.."/>
                        </div>
                        <div className='mb-4'>
                            <Input label={'Email'} type={'email'} value={data.email} onChange={e => setData('email', e.target.value)} errors={errors.email} placeholder="Input email user.."/>
                        </div>
                          <div className='mb-4'>
                            <div className='flex items-center gap-2 text-sm text-gray-700'>
                                        Roles
                            </div>
                            <Select2 onChange={handleSelectedRoles}  defaultOptions={data.filterRole} options={formattedRoles}  placeholder="Pilih Role..." />
                        </div>
                       
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('users.index')}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
// Kode ini adalah form untuk mengedit pengguna dalam aplikasi berbasis React dengan Inertia.js. Pengguna dapat mengedit nama, email, dan peran yang dimiliki. Data 
// yang telah diperbarui akan dikirim ke server, dan jika berhasil, notifikasi sukses akan muncul menggunakan SweetAlert2.