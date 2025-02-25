// untuk membangun UI
import React from 'react'
// layout untuk authtentikasi
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// membungkus konten 
import Container from '@/Components/Container';
// head untuk tag head
// useFrom untuk pengiriman data form
import { Head, useForm } from '@inertiajs/react';
// untuk input data dengan beberapa komponen
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
// notifikasi jika berhasil menampilkan data
import Swal from 'sweetalert2';

// untuk permission baru
export default function Create({auth}) {

    // define state with helper inertia
    // data: objek simpan nilai data, name
    // setdata: untuk mengubah nilai dlm objek data
    // post: mengirimkan data ke server dengan HTTP POST
    // errors: untuk menampung nilai keslahan (validate)
    const { data, setData, post, errors } = useForm({
        name : ''
    });

    // define method handleStoreData
    const handleStoreData = async (e) => {
        // mencegah reload  saat data sedang dikirim
        e.preventDefault();

        // mengirimkan data dengan post ke rute permissions.store
        post(route('permissions.store'), {

            // memberitahukan data yang berhasil di kirim
            // tampilannya
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data berhasil di buat!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        // untuk halaman yang perlu authtentikasi
        <AuthenticatedLayout
        // informasi pengguna yang sedang login
            user={auth.user}
            // judul halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Permission</h2>}
        >
            {/* judul halaman */}
            <Head title={'Create Permissions'}/>
            {/* bungkus konten */}
            <Container>
                {/* bungkus bagian konten */}
                <Card title={'Create new permission'}>
                    {/* formulir */}
                    <form onSubmit={handleStoreData}>
                        <div className='mb-4'>
                            {/* Input: Komponen untuk input nama permission. Nilainya terikat pada data.name, dan setiap perubahan akan memperbarui state menggunakan setData. */}
                            <Input label={'Permission Name'} type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input permission name.."/>
                        </div>
                        {/* penggunaan tailwind.css */}
                        <div className='flex items-center gap-2'>
                            {/* tombol submit */}
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('permissions.index')}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
// Komponen ini menangani pembuatan permission baru dengan menggunakan Inertia.js untuk komunikasi antar frontend dan backend. Menggunakan SweetAlert2 untuk memberikan umpan balik kepada pengguna dan Tailwind CSS untuk styling.
//  Semua proses tersebut dilakukan dengan React dan dikendalikan oleh form state yang dikelola menggunakan hook useForm dari Inertia.js.