import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth, book, collections, categories }) {
    const { data, setData, put, errors } = useForm({
        title: book.title || '',
        author: book.author || '',
        publication_year: book.publication_year || '',
        category_id: book.category_id || '',
        collection_id: book.collection_id || '',
        book: null, // opsional jika user ingin update file
    });

    const handleUpdateData = (e) => {
        e.preventDefault();

        put(route('books.update', book.id), {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Buku berhasil diperbarui!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat memperbarui buku.',
                    icon: 'error',
                    showConfirmButton: true
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Buku</h2>}
        >
            <Head title="Edit Buku" />
            <Container>
                <Card title="Edit Buku">
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                            <Input
                                label="Judul"
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                errors={errors.title}
                            />
                        </div>

                        <div className='mb-4'>
                            <Input
                                label="Penulis"
                                type="text"
                                value={data.author}
                                onChange={e => setData('author', e.target.value)}
                                errors={errors.author}
                            />
                        </div>

                        <div className='mb-4'>
                            <Input
                                label="Tahun Terbit"
                                type="number"
                                value={data.publication_year}
                                onChange={e => setData('publication_year', e.target.value)}
                                errors={errors.publication_year}
                            />
                        </div>

                        <div className='mb-4'>
                            <label className="text-sm text-gray-700">Koleksi</label>
                            <select
                                value={data.collection_id}
                                onChange={e => setData('collection_id', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Pilih Koleksi...</option>
                                {collections.map((collection) => (
                                    <option key={collection.id} value={collection.id}>
                                        {collection.name}
                                    </option>
                                ))}
                            </select>
                            {errors.collection_id && <span className="text-red-500 text-sm">{errors.collection_id}</span>}
                        </div>

                        <div className='mb-4'>
                            <label className="text-sm text-gray-700">Kategori</label>
                            <select
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Pilih Kategori...</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <span className="text-red-500 text-sm">{errors.category_id}</span>}
                        </div>

                        {/* Upload File (optional) */}
                        {/* <div className="mb-4">
                            <label className="text-sm text-gray-700">Unggah File Baru (opsional)</label>
                            <input
                                type="file"
                                onChange={e => setData('book', e.target.files[0])}
                                className="w-full border-gray-300 rounded-md shadow-sm mt-1"
                            />
                            {errors.book && <span className="text-red-500 text-sm">{errors.book}</span>}
                        </div> */}

                        <div className="flex items-center gap-2">
                            <Button type="submit">Perbarui</Button>
                            <Button type="cancel" url={route('books.index')}>Batal</Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
