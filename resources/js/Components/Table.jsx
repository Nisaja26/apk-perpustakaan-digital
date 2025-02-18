import React from 'react'

// untuk membungkus konten dalam elemen
const Card = ({ title, className, children }) => {
    return (
        <>
            <div className={`p-4 rounded-t-lg border ${className} bg-white`}>
                <div className='flex items-center gap-2 font-semibold text-sm text-gray-700 uppercase'>
                    {title}
                </div>
            </div>
            <div className='bg-white rounded-b-lg border-t-0'>
                {children}
            </div>
        </>

    )
}

// tabel tersebut dapat digulir secara horizontal jika lebarnya lebih besar dari kontainer
const Table = ({ children }) => {
    return (
        <div className="w-full overflow-hidden overflow-x-auto border-collapse rounded-b-lg border border-t-0">
            <table className="w-full text-sm">
                {children}
            </table>
        </div>
    );
};

// mendefinisikan bagian thead (header) dalam tabel
const Thead = ({ className, children }) => {
    return (
        <thead className={`${className} border-b bg-gray-50`}>{children}</thead>
    );
};

// mendefinisikan bagian tbody (konten utama) dari tabel
const Tbody = ({ className, children }) => {
    return (
        <tbody className={`${className} divide-y bg-white`}>
            {children}
        </tbody>
    );
};

// untuk mendefinisikan sel (cell) dalam baris tabel
const Td = ({ className, children}) => {
    return (
        <td
            className={`${className} whitespace-nowrap p-4 align-middle text-gray-700`}
        >
            {children}
        </td>
    );
};

// untuk mendefinisikan kolom header tabel
const Th = ({ className, children }) => {
    return (
        <th
            scope="col"
            className={`${className} h-12 px-4 text-left align-middle font-medium text-gray-700`}
        >
            {children}
        </th>
    );
};

// untuk menampilkan baris kosong dalam tabel jika tidak ada data yang tersedia. 
// Properti colSpan memastikan sel ini akan melebar melintasi seluruh kolom, dan message memberikan pesan yang dapat ditampilkan, 
// misalnya "Data tidak tersedia." children dapat digunakan untuk menambahkan elemen lain di dalam baris kosong tersebut.
const Empty = ({colSpan, message, children}) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        {children}
                        <div className="mt-5">
                            {message}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

// untuk menambahkan komponen-komponen tadi sebagai bagian dari Table
Table.Card = Card;
Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Td = Td;
Table.Th = Th;
Table.Empty = Empty;

export default Table;
// Kode ini mendefinisikan kumpulan komponen untuk membuat dan mengelola tampilan tabel di React dengan desain yang fleksibel dan dapat disesuaikan.