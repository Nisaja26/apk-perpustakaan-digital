import React from 'react'

// komponen fungsional react
// children: Isi atau konten lain yang akan diletakkan di dalam kartu, bisa berupa elemen apa saja seperti teks, gambar, atau komponen lain.
export default function Card({ title, children, className }) {
    return (
        <>
        {/* judul */}
            <div className={`p-4 rounded-t-lg border ${className} bg-white`}>
                <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 capitalize'>
                    {title}
                </div>
                {/* konten */}
                {/* menampilkan konten yang diberikan melalui prop children */}
            </div>
            <div className='bg-white p-4 border border-t-0 border-b rounded-b-lg'>
                {children}
            </div>
        </>
    )
}
// komponen UI sederhana yang bisa digunakan untuk menampilkan elemen dengan desain kartu