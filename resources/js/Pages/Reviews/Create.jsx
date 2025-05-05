import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';
// import Select from '@/Components/Select'; // Jika kamu punya komponen Select

export default function Create({ auth, books }) {
    // define state with helper inertia
    const { data, setData, post, errors } = useForm({
        user_id: auth.user.id,
        book_id: '',
        comment: '', // ubah dari review ke comment
        rating: ''
    });


    const handleStoreData = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('reviews.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Komentar telah ditambahkan!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: (errors) => {
                console.log('VALIDATION ERRORS:', errors);
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Periksa kembali form isian Anda.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            }

        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Review</h2>}
        >
            <Head title="Tambah Review" />
            <Container>
                <Card title="Form Review Buku">
                    <form onSubmit={handleStoreData}>
                        {/* Pilih Buku */}
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Judul Buku</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={data.book_id}
                                onChange={(e) => setData('book_id', e.target.value)}
                            >
                                <option value="">-- Pilih Buku --</option>
                                {books.map((book) => (
                                    <option key={book.id} value={book.id}>
                                        {book.title}
                                    </option>
                                ))}
                            </select>
                            {errors.book_id && (
                                <div className="text-red-600 text-sm mt-1">{errors.book_id}</div>
                            )}
                        </div>

                        <textarea
                            className="w-full border rounded px-3 py-2"
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            placeholder="Tulis komentar Anda..."
                        />
                        {errors.comment && <span className="text-red-500 text-sm">{errors.comment}</span>}
                        

                        {/* Rating */}                        <div className="mb-4">
                            <Input
                                label="Rating (1–5)"
                                type="number"
                                min="1"
                                max="5"
                                value={data.rating}
                                onChange={(e) => setData('rating', e.target.value)}
                                errors={errors.rating}
                                placeholder="Masukkan rating"
                            />
                        </div>

                        {/* Tombol Submit */}
                        <div className="flex items-center gap-2">
                            <Button type="submit" />
                            <Button type="cancel" url={route('reviews.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}