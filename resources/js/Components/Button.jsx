// untuk menampilkan berbagai jenis tombol berdasarkan jenis aksi yang diinginkan,
//  seperti "Add", "Edit", "Delete", "Submit", dan "Cancel". Komponen ini juga memanfaatkan Inertia.js
//  untuk navigasi dan mengintegrasikan SweetAlert2 untuk konfirmasi penghapusan data.
import { Link, useForm } from '@inertiajs/react'
import { IconArrowBack, IconCheck, IconPencilCog, IconPlus, IconTrash } from '@tabler/icons-react';
import React from 'react'
import Swal from 'sweetalert2';
export default function Button({ type, url, className, children, ...props }) {

    const { delete : destroy } = useForm();

    //  untuk menampilkan konfirmasi menggunakan SweetAlert2 saat pengguna mencoba menghapus data
    // Jika pengguna mengonfirmasi penghapusan, maka destroy(url) (dari useForm) digunakan untuk mengirim permintaan penghapusan data ke server.
    // Setelah berhasil, SweetAlert2 menampilkan pesan sukses
    const handleDeleteData = async (url) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            text: 'Data is unrecoverable!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(url)

                Swal.fire({
                    title: 'Success!',
                    text: 'Data deleted successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <>
        {/* Tombol ini mengarahkan pengguna ke URL yang diberikan (biasanya untuk membuat data baru). 
        Menggunakan ikon IconPlus untuk menunjukkan bahwa ini adalah tombol untuk menambah data baru.
        Pada layar besar (lg), teks "Create New Data" akan ditampilkan
        */}
            {type === 'add' &&
                <Link href={url} className='px-4 py-2 text-sm border rounded-lg bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-100'>
                    <IconPlus size={18} strokeWidth={1.5}/> <span className='hidden lg:flex'>Create New Data</span>
                </Link>
            }
            {/* untuk membuka modal atau tindakan lainnya
            children di sini adalah konten tombol (misalnya, teks atau elemen lainnya).
            Properti className dan ...props memungkinkan kustomisasi gaya dan penanganan properti lainnya.
            */}
            {type === 'modal' &&
                <button {...props} type='button' className={`${className} px-4 py-2 text-sm border rounded-lg flex items-center gap-2`}>
                    {children}
                </button>
            }
            {/*  untuk mengirimkan data ke server (biasanya untuk form submission).
            Menggunakan ikon IconCheck untuk menunjukkan aksi menyimpan data.
            */}
            {type === 'submit' &&
                <button type='submit' className='px-4 py-2 text-sm rounded-lg border border-teal-100 bg-teal-50 text-teal-500 flex items-center gap-2 hover:bg-teal-100'>
                    <IconCheck size={16} strokeWidth={1.5}/> Save Data
                </button>
            }
            {/* untuk membatalkan atau kembali ke halaman sebelumnya.
            ikon IconArrowBack untuk menunjukkan tindakan kembali.
             */}
            {type === 'cancel' &&
                <Link href={url} className='px-4 py-2 text-sm rounded-lg border border-rose-100 bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100'>
                    <IconArrowBack size={16} strokeWidth={1.5}/> Go Back
                </Link>
            }
            {/*  untuk mengedit data yang ada
            IconPencilCog yang menunjukkan tindakan pengeditan.
             */}
            {type === 'edit' &&
                <Link href={url} className='px-4 py-2 rounded-lg bg-orange-50 text-orange-500 flex items-center gap-2 hover:bg-orange-100'>
                    <IconPencilCog size={16} strokeWidth={1.5}/>
                </Link>
            }
            {/*  untuk menghapus data, yang memicu fungsi konfirmasi penghapusan.
            handleDeleteData dipanggil untuk memunculkan konfirmasi dengan SweetAlert2.
             */}
            {type === 'delete' &&
                <button onClick={() => handleDeleteData(url)} className='px-4 py-2 rounded-lg bg-rose-50 text-rose-500 flex items-center gap-2 hover:bg-rose-100'>
                    <IconTrash size={18} strokeWidth={1.5}/>
                </button>
            }
        </>
    )
}
// Komponen Button ini memberikan fleksibilitas untuk membuat tombol dengan berbagai aksi yang berbeda
//  berdasarkan properti type. Pengguna dapat menyesuaikan jenis tombol yang ditampilkan seperti tombol untuk menambah data, mengedit, menghapus, mengonfirmasi pengiriman, atau membatalkan aksi, dan tombol-tombol ini sudah dilengkapi
//  dengan ikon dari Tabler Icons untuk memberikan indikasi visual terhadap aksi yang akan dilakukan.