export default function Checkbox({ label, ...props }) {
    // Checkbox adalah sebuah komponen fungsional yang menerima properti (props) sebagai input.
    // Properti yang diterima adalah label (untuk teks label yang ditampilkan di samping checkbox) 
    // dan ...props (untuk properti tambahan seperti checked, onChange, atau lainnya yang diteruskan ke elemen input checkbox).
    return (
        <div>
            <div className="flex flex-row items-center gap-2">
                <input
                    {...props}
                    type="checkbox"
                    className={
                        "rounded-md bg-white border-gray-200 checked:bg-teal-500"
                    }
                />
                {/* mengembalikan elemen div yang membungkus checkbox dan label */}
                {/* mengembalikan elemen div yang membungkus checkbox dan label */}
                <label className="text-sm text-gray-700">{label}</label>
            </div>
        </div>
    );
}
// Komponen Checkbox ini digunakan untuk membuat elemen checkbox dengan label yang dapat disesuaikan. Komponen ini menerima:
// label untuk teks yang ditampilkan di samping checkbox.
// props yang diteruskan ke elemen input checkbox, memungkinkan 
// komponen ini untuk menerima atribut lain seperti checked, onChange, atau lainnya.