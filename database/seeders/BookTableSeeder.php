<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Collection;
use App\Models\Category;

use Illuminate\Database\Seeder;

class BookTableSeeder extends Seeder
{
    public function run()
    {
        // Mengambil kategori dan koleksi yang ada di database
        $collection = Collection::first(); // Ambil koleksi pertama (pastikan ada data)
        $category = Category::first(); // Ambil kategori pertama (pastikan ada data)
       

        // Validasi jika kategori dan koleksi ada
        if ($category && $collection) {
            // Menambahkan buku baru dengan data yang sesuai
            Book::create([
                'title' => 'Belajar Laravel untuk Pemula',
                'author' => 'John Doe',
                'published_year' => '2021',  // Sesuaikan dengan format Y
                'collection_id' => $collection->id,  // ID koleksi yang ada
                'category_id' => $category->id,  // ID kategori yang ada
                
            ]);

            Book::create([
                'title' => 'Membangun Aplikasi Web dengan Laravel',
                'author' => 'Jane Doe',
                'published_year' => '2022',  // Sesuaikan dengan format Y
                'collection_id' => $collection->id,  // ID koleksi yang ada
                'category_id' => $category->id,  // ID kategori yang ada
               
            ]);
        } else {
            // Tampilkan pesan jika kategori atau koleksi tidak ditemukan
            echo "Pastikan ada data di tabel categories dan collections.\n";
        }
    }
}
