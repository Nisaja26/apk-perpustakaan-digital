import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth }) {

    // destruct category from usePage props
    const { category } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors } = useForm({
        name: category.name,
        _method: 'put'
    });

    // define method handleUpdateData
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('categories.update', category.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Category updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Category</h2>}
        >
            <Head title={'Edit Category'} />

            <Container>
                <Card title={'Edit category'}>
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                            <Input
                                label={'Category Name'}
                                type={'text'}
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                errors={errors.name}
                                placeholder="Input category name..."
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('categories.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
