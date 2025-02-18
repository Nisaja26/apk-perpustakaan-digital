// import semua yang dibutuhkan
import { useForm } from '@inertiajs/react';
// untuk menampilkan ikon pencarian di dalam input.
import { IconSearch } from '@tabler/icons-react';
import React from 'react'
// react functional dengan props 
export default function Search({url, placeholder}) {

    // define use form inertia
    // menyimpan nilai input pencarian
    const {data, setData, get} = useForm({
        search : '',
    })
    // setData: Fungsi untuk memperbarui nilai dari data. Misalnya, setData('search', e.target.value)
    //  digunakan untuk memperbarui nilai search dengan nilai input terbaru.
    // get: Fungsi dari Inertia.js untuk melakukan permintaan GET ke URL yang diberikan dengan data yang terkirim, dalam hal ini dengan parameter pencarian.


    // define method searchData method baru
    // menangani pengiriman form ketika pengguna klik kirim
    const handleSearchData = (e) => {
        e.preventDefault();

        get(`${url}?search=${data.search}`)
    }

    return (
        <form onSubmit={handleSearchData}>
            <div className='relative'>
                <input
                    type='text'
                    value={data.search}
                    onChange={e => setData('search', e.target.value)}
                    className='py-2 px-4 pr-11 block w-full rounded-lg text-sm border focus:outline-none focus:ring-0 focus:ring-gray-400 text-gray-700 bg-white border-gray-200 focus:border-gray-200'
                    placeholder={placeholder}/>
                <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4'>
                    <IconSearch size={18} strokeWidth={1.5}/>
                </div>
            </div>
        </form>
    )
}
// Komponen Search ini berfungsi sebagai input pencarian dengan fitur Inertia.js untuk melakukan pencarian secara dinamis melalui permintaan GET. Pengguna mengetikkan kata kunci pencarian, dan saat form disubmit, nilai pencarian akan dikirimkan ke URL yang ditentukan dengan query parameter search. 
// Selain itu, terdapat ikon pencarian di dalam input untuk memberikan antarmuka pengguna yang lebih baik.