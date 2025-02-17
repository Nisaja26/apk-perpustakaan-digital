import React from 'react'

// komponen fungsional yang menerima beberapa properti (props)
// label: Teks yang akan ditampilkan sebagai label untuk elemen input
// type: Jenis input (misalnya, text, password, email).
// className: Kelas CSS tambahan yang dapat disesuaikan untuk elemen input.
// errors: Pesan kesalahan yang ditampilkan jika ada.
// ...props: Properti tambahan lainnya yang diteruskan ke elemen input, seperti value, onChange,
export default function Input({label, type, className, errors, ...props}) {

    // gaya gap dan text
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-gray-600 text-sm'>
                {label}
            </label>
            {/* input field */}
            <input
                type={type}
                className={`w-full px-4 py-2 border text-sm rounded-md focus:outline-none focus:ring-0 bg-white text-gray-700 focus:border-gray-200 border-gray-200 ${className}`}
                {...props}
            />
            {/* Jika ada pesan kesalahan (jika properti errors ada), maka pesan ini akan ditampilkan dalam elemen <small> dengan kelas warna teks merah */}
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}