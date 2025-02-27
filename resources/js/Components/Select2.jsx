// library
import React from 'react'
// untuk membuat dropdown yang lebih canggih
import Select from 'react-select'


//  menerima beberapa props
export default function Select2({ options, onChange, placeholder, defaultOptions }) {
    // options: Data yang akan ditampilkan di dalam dropdown
    // onChange: Callback yang akan dipanggil ketika nilai dropdown berubah (misalnya, saat pengguna memilih opsi).
    // placeholder: Teks placeholder yang ditampilkan saat tidak ada opsi yang dipilih
    // defaultOptions: Nilai default yang akan dipilih saat pertama kali render.


    // Custom Styles
    //  untuk mengubah tampilan elemen dropdown
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#4CAF50' : '#ccc', // Warna border saat fokus
            boxShadow: state.isFocused ? '0 0 5px rgba(76, 175, 80, 0.5)' : 'none',
            outline: 'none', // Menghilangkan garis biru
            '&:hover': {
                borderColor: '#4CAF50', // Warna border saat hover
            },
        }),
    };

    return (
        <Select
        // options={options}: Mengirimkan data opsi yang diterima melalui props ke komponen
            options={options}
            // Menyambungkan fungsi callback onChange yang akan dipanggil saat pengguna memilih nilai.
            onChange={onChange}
            // Memberikan kelas CSS untuk styling
            className="basic-multi-select"
            //  Menyediakan nilai default yang akan dipilih
            defaultValue={defaultOptions || null} // Set nilai default
            // Menambahkan prefix select ke kelas CSS
            classNamePrefix="select"
            // Menampilkan teks placeholder jika tidak ada nilai yang dipilih
            placeholder={placeholder || "Pilih opsi..."}
            //  dropdown dengan multiple select
            isMulti // Aktifkan fitur multiple select
            // gaya kustom yang telah didefinisikan
            styles={customStyles}
        />
    );
}
// Komponen Select2 adalah wrapper atau pembungkus untuk komponen Select dari react-select dengan beberapa fitur dan kustomisasi:
// Menampilkan dropdown yang dapat memilih banyak opsi.
// Mendukung tampilan dan perilaku kustom dengan customStyles.
// Dapat disesuaikan melalui properti seperti options, onChange, placeholder, dan defaultOptions.
// Menggunakan properti isMulti untuk memungkinkan pemilihan banyak opsi.