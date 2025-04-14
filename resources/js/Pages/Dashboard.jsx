import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Home
                </h2>
            }
        >
            <Head title="Dashboard" />


            <div className="p-6  flex justify-center items-center ">
                <img
                    src="/img/home.png"
                    alt="Contoh Gambar"
                    className="max-w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
            </div>


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-black shadow-sm sm:rounded-lg">
                        <div className="p-6 text-white italic font-semibold flex justify-center items-center h-15">
                            <span className="text-xl shadow-lg">
                                Anda Telah Login
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}