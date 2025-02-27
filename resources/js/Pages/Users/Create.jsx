// library react
import React from 'react'
// menampilkan navigasi dan struktur halaman
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// membungkus konten
import Container from '@/Components/Container';
// tampilan head, form dan halaman dengan inertia js
import { Head, useForm, usePage } from '@inertiajs/react';
// beberapa komponen
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Select2 from '@/Components/Select2';
// memberikan notifikasi data berhasil di kirim
import Swal from 'sweetalert2';

// untuk membuat pengguna baru
export default function Create({auth}) {


    // destruct roles from usepage props
    // Mengakses Data roles
    const { roles } = usePage().props;

    // define state with helper inertia
    // untuk mengelola state form di Inertia.js. data adalah objek yang menyimpan nilai-nilai input form.
    const { data, setData, post, errors } = useForm({
        name : '',
        email: '',
        selectedRoles : [],
        password: '',
        password_confirmation: ''
    });

    // define method handleSelectedroles
    // Mengubah Format Data roles untuk Dropdown
    const formattedRoles = roles.map(role => ({
        value: role.name,
        label: role.name
        // Data roles yang diterima dari server diformat ulang menjadi array objek yang cocok untuk digunakan di dropdown Select2.
        //  Setiap peran (role) diubah menjadi objek dengan properti value dan label, keduanya diisi dengan nama peran.
    }));



    // untuk Menangani Pilihan Peran
    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map(option => option.value);
        setData('selectedRoles', selectedValues);
        // handleSelectedRoles: Fungsi ini dipanggil saat pengguna memilih peran di dropdown. 
        // selected adalah array dari objek yang dipilih. Fungsi ini mengonversi array tersebut menjadi array nilai (value),
        //  kemudian mengupdate state selectedRoles dengan nilai-nilai yang dipilih.
    }

    // define method handleStoreData
    // Menyimpan Data Pengguna Baru
    const handleStoreData = async (e) => {
        e.preventDefault();

        //  Mengirim data ke rute users.store di server
        post(route('users.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        // Menggunakan layout yang hanya bisa diakses oleh pengguna yang sudah terautentikasi.
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>}
        >
            <Head title={'Create Users'}/>
            <Container>
                <Card title={'Create new user'}>
                    <form onSubmit={handleStoreData}>
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
                        <Select2 onChange={handleSelectedRoles} options={formattedRoles} placeholder="Pilih Role..." />
                            {/* {selectedOptions && selectedOptions.length > 0 && (
                                <div>
                                    <h4>Rasa yang Anda pilih:</h4>
                                    <ul>
                                        {selectedOptions.map((option) => (
                                            <li key={option.value}>{option.label}</li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}
                        </div>
                        {/* <div className='mb-4'>
                            <div className={`p-4 rounded-t-lg border bg-white`}>
                                <div className='flex items-center gap-2 text-sm text-gray-700'>
                                    Roles
                                </div>
                            </div>
                            <div className='p-4 rounded-b-lg border border-t-0 bg-gray-100'>
                                <div className='flex flex-row flex-wrap gap-4'>
                                    {roles.map((role, i) => (
                                        <Checkbox label={role.name} value={role.name} onChange={handleSelectedRoles} key={i}/>
                                    ))}
                                </div>
                                {errors.selectedRoles && <div className='text-xs text-red-500 mt-4'>{errors.selectedRoles}</div>}
                            </div>
                        </div> */}
                        <div className='mb-4'>
                            <Input label={'Password'} type={'password'} value={data.password} onChange={e => setData('password', e.target.value)} errors={errors.password} placeholder="Input password user.."/>
                        </div>
                        <div className='mb-4'>
                            <Input label={'Password Confirmation'} type={'password'} value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} errors={errors.password_confirmation} placeholder="Input password confirmation..."/>
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
// Kode ini adalah halaman pembuatan pengguna baru dalam aplikasi berbasis React dengan Inertia.js. 
// Pengguna dapat memasukkan nama, email, peran (role), password, dan konfirmasi password.
//  Data form dikirim ke server dengan menggunakan post dari  useForm dan hasilnya akan memunculkan notifikasi sukses menggunakan SweetAlert2 setelah data berhasil disimpan.