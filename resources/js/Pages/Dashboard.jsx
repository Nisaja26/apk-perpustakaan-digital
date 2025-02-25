import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
        header={
            // judul halaman
            <h2 className="text-white bg-black p-4 rounded-lg shadow-lg text-3xl font-extrabold leading-tight flex justify-center items-center h-24">
                Home
            </h2>
        }
        
        >
            <Head title="Dashboard" />

            {/* tampilan */}
            {/*  padding vertikal (atas dan bawah) */}
            <div className="py-12"> 
                {/* mx auto: margin otomatis di tengah
                max-w-7xl: lebar max 7xl
                sm:px-6: padding horizontal kiri dan kanan kecil dan lebih besar
                lg:px-8: padding horizontal besar dan lebih besar
                */}
               <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* overflow-hidden: konten yang melebihi batas akan disebunyikan*/}
                  <div className="overflow-hidden bg-black shadow-sm sm:rounded-lg">
                        <div className="p-6 text-white italic font-semibold flex justify-center items-center h-24">
                          {/* tampilan teks */}
                         Anda Telah Login
                        </div>
                    </div>
                </div>
             </div>
        </AuthenticatedLayout>
    );
}
