// untuk membangun UI
import React from 'react'
// Leyout untuk authtentikasi
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// membungkus konten komponen 
import Container from '@/Components/Container';
// Head: untuk tag head
// usefrom: mengirimkan data 
// UsePage : untuk mengakses props yang dikirimkan oleh halaman sebelumnya atau backend.
import { Head, useForm, usePage } from '@inertiajs/react';
// untuk input data beberapa komponen
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
// memberikan notifikasi jika berhasil kirim data
import Swal from 'sweetalert2';
// untuk halaman pengeditan permission
export default function Edit({auth}) {

    // destruct permissions from usepage props
    // usePage: Hook dari Inertia.js yang digunakan untuk mengakses data atau props yang dikirimkan oleh backend ke halaman ini.
    //  untuk mengakses permission dari props halaman yang berarti data permission yang ingin diedit.
    const { permission } = usePage().props;

    // define state with helper inertia
    // useForm: digunakan untuk menangani state form
    // data: Objek yang menyimpan nilai-nilai form
    // SetData: untuk mengubah nilai data
    // post mengirimkan data
    // errors: menampilkan kesalahan jika ada
    const { data, setData, post, errors } = useForm({
        // untuk menyimulasikan metode HTTP PUT dalam form karena HTML hanya mendukung GET dan POST.
        //  Ini memungkinkan kita untuk mengirimkan permintaan PUT untuk pembaruan data.
        name : permission.name,
        _method: 'put'
    });


    // define method handleUpdateData
    // jika formulir di submit
    const handleUpdateData = async (e) => {
        // mencegah reload ketika sedang submit
        e.preventDefault();

        // Mengirimkan data ke server menggunakan metode POST, tetapi dengan _method: 'put' yang disertakan di form 
        // untuk meniru permintaan PUT. Rute yang digunakan adalah permissions.
        // update, yang akan diikuti oleh ID permission yang ingin diperbarui (permission.id).
        post(route('permissions.update', permission.id), {
            // memberikan notifikasi ketika data berhasil
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data telah di update!',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Permission</h2>}
        >
            {/* judul halaman */}
            <Head title={'Edit Permissions'}/>
            {/* bungkus konten */}
            <Container>
                {/* bungkus bagian konten */}
                <Card title={'Edit permission'}>
                    {/* formulir */}
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                        {/* Input: Komponen untuk input nama permission.
                         Nilainya terikat pada data.name, dan setiap perubahan akan memperbarui state menggunakan setData. */}
                            <Input label={'Permission Name'} type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input permission name.."/>
                        </div>
                        {/* tampilan button dengan tailwind.css */}
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('permissions.index')}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
// Komponen Edit ini memungkinkan pengguna untuk mengedit permission yang ada. Langkah-langkah utama dalam komponen ini adalah:
// Mengambil data permission yang ada melalui usePage().
// Menampilkan data tersebut dalam form yang dapat diedit.
// Mengirimkan pembaruan ke server menggunakan post dengan metode PUT untuk memperbarui data permission.
// Menampilkan notifikasi menggunakan SweetAlert2 setelah data berhasil diperbarui.