// untuk membuat pagination (navigasi halaman) dengan tombol "Previous" dan "Next", serta tautan halaman yang bisa diklik. 
// Pagination ini menggunakan Inertia.js untuk pengelolaan URL dan Tabler Icons untuk ikon navigasi.
import React from 'react'
import { Link } from '@inertiajs/react';
// Ikon dari library Tabler Icons yang digunakan untuk menampilkan panah kanan dan kiri untuk navigasi "Next" dan "Previous".
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';

// react fungsional
// menerima properti links, yang merupakan array dari objek-objek yang berisi informasi 
// tentang halaman-halaman pagination, seperti URL dan label yang akan ditampilkan
export default function Pagination({ links }) {

    //  CSS untuk tombol-tombol pagination
    const style = 'p-1 text-sm border rounded-md bg-white text-gray-500 hover:bg-gray-100'

    return (
        <>
        {/* map() untuk mengiterasi elemen dalam array links */}
            <ul className="mt-2 lg:mt-5 justify-end flex items-center gap-1">
                {links.map((item, i) => {
                    // menangani tautan 
                    return item.url != null ? (
                        item.label.includes('Previous') ? (
                            <Link className={style} key={i} href={item.url}>
                                <IconChevronLeft size={'20'} strokeWidth={'1.5'}/>
                            </Link>
                        ) : item.label.includes('Next') ? (
                            <Link className={style} key={i} href={item.url}>
                                <IconChevronRight size={'20'} strokeWidth={'1.5'}/>
                            </Link>
                        ) : (
                            // menampilkan sebuah tombol dengan label yang berisi nomor halaman (item.label).
                            <Link className={`px-2 py-1 text-sm border  rounded-md text-gray-500 hover:bg-gray-100 ${item.active ? 'bg-white text-gray-700' : 'bg-white'}`} key={i} href={item.url}>
                                {item.label}
                            </Link>
                            // Tautan hanya akan dirender jika item.url tidak null. Ini menghindari rendering tombol pagination yang tidak memiliki URL yang valid (misalnya, untuk halaman pertama atau terakhir yang tidak memiliki link).
                        )
                    ) : null;
                })}
            </ul>
        </>
    )
}
// Komponen Pagination ini mengelola tampilan pagination dengan:
// Menampilkan tautan untuk navigasi antar halaman menggunakan Link dari Inertia.js.
// Menyediakan tombol untuk navigasi "Previous" dan "Next" dengan ikon panah dari Tabler Icons.
// Menangani nomor halaman dan menandai halaman aktif.
// Menggunakan gaya responsif dan efisien dengan Tailwind CSS.