//  ini menerima beberapa props
export default function Textarea({label, className, errors,...props}) {
    return (
        // sebagai wadah untuk label, textarea, dan pesan kesalahan
        <div className='flex flex-col gap-2'>
            {/* untuk menampilkan teks label yang diterima dari prop label */}
            <label className='text-gray-600 dark:text-gray-500 text-sm'>
                {label}
            </label>
            {/* Tampilan textarea */}
            <textarea
                className={`w-full px-4 py-2 border text-sm rounded-md focus:outline-none focus:ring-0 bg-white text-gray-700 focus:border-gray-200 border-gray-200 ${className}`}
                {...props}
            />
            {/* Jika prop errors diberikan (artinya nilai errors 
            tidak kosong atau null), maka pesan kesalahan akan ditampilkan di bawah textarea */}
            {errors && (
                <small className='text-xs text-red-500'>{errors}</small>
            )}
        </div>
    )
}
// Komponen ini dirancang untuk merender elemen input <textarea> dengan label yang dapat disesuaikan, penanganan kesalahan opsional, dan desain yang fleksibel menggunakan Tailwind CSS. Komponen ini menerima 
// prop untuk label, kelas khusus, kesalahan validasi, dan atribut standar <textarea> lainnya.