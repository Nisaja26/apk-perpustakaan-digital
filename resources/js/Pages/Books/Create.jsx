import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { collections, categories } = usePage().props;

    const { data, setData, post, errors } = useForm({
        title: '',
        author: '',
        published_year: '',
        selectedCollection: '',
        selectedCategory: '',
    });

    
    const handleStoreData = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('books.store'), {
            data: {
                title: data.title,
                author: data.author,
                published_year: data.published_year,
                collection_id: data.selectedCollection,
                category_id: data.selectedCategory,
            },
            onSuccess: (success) => {
                console.log(success);
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Buku berhasil ditambahkan!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: (errors) => {
                console.log(errors);
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat menambahkan buku.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}  // Menampilkan data user yang sedang login
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Buku</h2>}  // Judul halaman
        >
            <Head title={'Tambah Buku'} />  {/* Menentukan title halaman */}
            <Container>
                <Card title={'Tambah Buku Baru'}>  {/* Judul card */}
                    <form onSubmit={handleStoreData} method="POST">  {/* Formulir untuk input data buku */}
                        {/* Input untuk judul buku */}
                        <div className="mb-4">
                            <Input
                                label={'Judul Buku'}  // Label input
                                type={'text'}  // Tipe input (teks)
                                value={data.title}  // Nilai input (berasal dari state)
                                onChange={e => setData('title', e.target.value)}  // Mengubah nilai state ketika input berubah
                                errors={errors.title}  // Menampilkan error jika ada
                                placeholder="Masukkan judul buku..."  // Placeholder di dalam input
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                        </div>

                        {/* Input untuk penulis buku */}
                        <div className="mb-4">
                            <Input
                                label={'Penulis'}
                                type={'text'}
                                value={data.author}
                                onChange={e => setData('author', e.target.value)}
                                errors={errors.author}
                                placeholder="Masukkan nama penulis..."
                            />
                            {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
                        </div>

                        {/* Input untuk tahun terbit */}
                        <div className="mb-4">
                            <Input
                                label={'Tahun Terbit'}  // Label input untuk tahun terbit
                                type={'number'}  // Tipe input nomber
                                value={data.published_year}  // Nilai input (berasal dari state)
                                onChange={e => setData('published_year', e.target.value)}  // Mengubah nilai state ketika input berubah
                                errors={errors.published_year}  // Menampilkan error jika ada
                                placeholder="Masukkan tahun terbit..."  // Placeholder di dalam input
                            />
                            {errors.published_year && <span className="text-red-500 text-sm">{errors.published_year}</span>}
                        </div>



                        {/* Dropdown untuk memilih koleksi buku */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                Koleksi
                            </div>
                            <select
                                value={data.selectedCollection}
                                onChange={e => setData('selectedCollection', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="" disabled>Pilih Koleksi...</option>
                                {collections.map((collection) => (
                                    <option key={collection.id} value={collection.id}>
                                        {collection.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Dropdown untuk memilih kategori buku */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                Kategori
                            </div>
                            <select
                                value={data.selectedCategory}
                                onChange={e => setData('selectedCategory', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="" disabled>Pilih kategori...</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tombol untuk submit dan membatalkan */}
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('books.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
