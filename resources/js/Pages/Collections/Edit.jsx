import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';
export default function Edit({auth}) {

    // destruct collections from usepage props
    const { collection } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors } = useForm({
        name : collection.name,
        _method: 'put'
    });

    // define method handleUpdateData
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('collections.update', collection.id), {
            onSuccess: () => {
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
        <AuthenticatedLayout
            user={auth.user}
            // judul halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Koleksi</h2>}
        >
            <Head title={'Edit Collections'}/>
            <Container>
                <Card title={'Edit koleksi'}>
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                            <Input label={'Collection Name'} type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input collection name.."/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('collections.index')}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}