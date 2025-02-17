// untuk membungkus konten yang diberikan melalui properti children dan memberikan gaya 
// yang responsif dan terstruktur menggunakan kelas CSS dari Tailwind CSS. 

//  sebuah komponen fungsional yang menerima properti (props) berupa children.
// children adalah konten atau elemen yang diteruskan ke dalam komponen. Ini memungkinkan komponen ini untuk membungkus elemen apa pun yang diberikan padanya.
export default function Container({children}) {

    // mengembalikan elemen div yang memiliki dua lapisan pembungkus
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/*  tempat untuk menampilkan konten atau elemen yang diteruskan ke dalam komponen Container */}
                {children}
            </div>
        </div>
    )
}