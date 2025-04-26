import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth,  collections, categories }) {

    const { data, setData, post, errors } = useForm({
        title: '',
        author: '',
        publication_year: '',
        collection_id: '',
        category_id: '',
        
    });

    const handleStoreData = (e) => {
        e.preventDefault();

        post(route('books.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Book created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Book</h2>}
        >
            <Head title={'Create Book'} />
            <Container>
                <Card title={'Create new book'}>
                    <form onSubmit={handleStoreData}>
                        <div className='mb-4'>
                            <Input label="Title" type="text" value={data.title} onChange={e => setData('title', e.target.value)} errors={errors.title} placeholder="Input book title..." />
                        </div>
                        <div className='mb-4'>
                            <Input label="Author" type="text" value={data.author} onChange={e => setData('author', e.target.value)} errors={errors.author} placeholder="Input author's name..." />
                        </div>
                        <div className='mb-4'>
                            <Input label="Publication Year" type="number" value={data.publication_year} onChange={e => setData('publication_year', e.target.value)} errors={errors.publication_year} placeholder="Input year..." />
                        </div>


                        <div className='mb-4'>
                            <label className="block font-medium mb-1 text-sm text-gray-700">Collection</label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                value={data.collection_id}
                                onChange={e => setData('collection_id', e.target.value)}
                            >
                                <option value="">Select Collection</option>
                                {collections.map(collection => (
                                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                                ))}
                            </select>
                            {errors.collection_id && <div className="text-red-600 text-sm mt-1">{errors.collection_id}</div>}
                        </div>


                        <div className='mb-4'>
                            <label className="block font-medium mb-1 text-sm text-gray-700">Category</label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <div className="text-red-600 text-sm mt-1">{errors.category_id}</div>}
                        </div>
                       

                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('books.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}
