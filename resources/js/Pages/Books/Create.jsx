import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Select2 from '@/Components/Select2'; // Komponen Select2 untuk dropdown
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    // Mendapatkan data kategori dan koleksi dari halaman melalui props
    const { categories, collections } = usePage().props;

    // Inisialisasi state form dengan inertia.js
    const { data, setData, post, errors } = useForm({
        title: '',  // Judul buku
        author: '',  // Penulis buku
        published_year: '',  // Tahun terbit buku
        selectedCategory: null,  // Kategori yang dipilih
        selectedCollection: null,  // Koleksi buku
    });

    // Menyiapkan kategori dalam format yang dapat diterima oleh Select2
    const formattedCategories = categories.map(category => ({
        value: category.id,  // Menggunakan ID kategori
        label: category.name,  // Menampilkan nama kategori di dropdown
    }));

    // Menyiapkan koleksi dalam format yang dapat diterima oleh Select2
    const formattedCollections = collections.map(collection => ({
        value: collection.id,  // Menggunakan ID koleksi
        label: collection.name,  // Menampilkan nama koleksi di dropdown
    }));

    // Fungsi untuk menangani pemilihan kategori
    const handleSelectedCategory = (selected) => {
        setData('selectedCategory', selected ? selected.value : null);
    };

    // Fungsi untuk menangani pemilihan koleksi
    const handleSelectedCollection = (selected) => {
        setData('selectedCollection', selected ? selected.value : null);
    };

    // Fungsi untuk menangani penyimpanan data buku (form submit)
    const handleStoreData = async (e) => {
        e.preventDefault();  // Mencegah reload halaman saat form disubmit

        // Mengirimkan data ke backend dengan InertiaJS
        post(route('books.store'), {
            data: {
                title: data.title,
                author: data.author,
                published_year: data.published_year, // Menambahkan published_year
                category_id: data.selectedCategory, // Mengirimkan category_id
                collection_id: data.selectedCollection, // Mengirimkan collection_id
            },
            onSuccess: () => {
                // Jika berhasil, tampilkan notifikasi sukses
                Swal.fire({
                    title: 'Success!',
                    text: 'Book added successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,  // Notifikasi akan hilang setelah 1.5 detik
                }).then(() => {
                    // Redirect ke halaman daftar buku setelah sukses
                    window.location.href = route('books.index');
                });
            },
            onError: () => {
                // Jika gagal, tampilkan pesan error
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error adding the book.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}  // Menampilkan data user yang sedang login
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Book</h2>}  // Judul halaman
        >
            <Head title={'Create Book'} />  {/* Menentukan title halaman */}
            <Container>
                <Card title={'Add New Book'}>  {/* Judul card */}
                    <form onSubmit={handleStoreData}>  {/* Formulir untuk input data buku */}
                        {/* Input untuk judul buku */}
                        <div className="mb-4">
                            <Input 
                                label={'Title'}  // Label input
                                type={'text'}  // Tipe input (teks)
                                value={data.title}  // Nilai input (berasal dari state)
                                onChange={e => setData('title', e.target.value)}  // Mengubah nilai state ketika input berubah
                                errors={errors.title}  // Menampilkan error jika ada
                                placeholder="Input book title..."  // Placeholder di dalam input
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                        </div>
                        
                        {/* Input untuk penulis buku */}
                        <div className="mb-4">
                            <Input 
                                label={'Author'} 
                                type={'text'} 
                                value={data.author} 
                                onChange={e => setData('author', e.target.value)} 
                                errors={errors.author} 
                                placeholder="Input book author..." 
                            />
                            {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
                        </div>

                        {/* Input untuk tahun terbit */}
                        <div className="mb-4">
                            <Input 
                                label={'Published Year'}  // Label input untuk tahun terbit
                                type={'text'}  // Tipe input (teks)
                                value={data.published_year}  // Nilai input (berasal dari state)
                                onChange={e => setData('published_year', e.target.value)}  // Mengubah nilai state ketika input berubah
                                errors={errors.published_year}  // Menampilkan error jika ada
                                placeholder="Input year of publication..."  // Placeholder di dalam input
                            />
                            {errors.published_year && <span className="text-red-500 text-sm">{errors.published_year}</span>}
                        </div>

                        {/* Dropdown untuk memilih kategori buku */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                Category
                            </div>
                            <Select2 
                                onChange={handleSelectedCategory}  // Ketika kategori dipilih, akan memanggil handleSelectedCategory
                                options={formattedCategories}  // Pilihan kategori yang diformat
                                placeholder="Select a category..."  // Placeholder untuk dropdown
                            />
                            {errors.selectedCategory && <span className="text-red-500 text-sm">{errors.selectedCategory}</span>}
                        </div>

                        {/* Dropdown untuk memilih koleksi buku */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                Collection
                            </div>
                            <Select2 
                                onChange={handleSelectedCollection}  // Ketika koleksi dipilih, akan memanggil handleSelectedCollection
                                options={formattedCollections}  // Pilihan koleksi yang diformat
                                placeholder="Select a collection..."  // Placeholder untuk dropdown
                            />
                            {errors.selectedCollection && <span className="text-red-500 text-sm">{errors.selectedCollection}</span>}
                        </div>

                        {/* Tombol untuk submit dan membatalkan */}
                        <div className="flex items-center gap-2">
                            <Button type={'submit'} />  {/* Tombol untuk mengirimkan form */}
                            <Button type={'cancel'} url={route('books.index')} />  {/* Tombol untuk membatalkan dan kembali ke daftar buku */}
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
