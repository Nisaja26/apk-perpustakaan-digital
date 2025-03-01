<?php

// menyediakan metode up() dan down()
use Illuminate\Database\Migrations\Migration;
// untuk mendefinisikan kolom-kolom dalam tabel
use Illuminate\Database\Schema\Blueprint;
// untuk membuat, mengubah, atau menghapus tabel di database
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
     //  untuk mendefinisikan perubahan yang akan dilakukan pada database
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->year('published_year');
            $table->foreignId('collection_id')->constrained('collections')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        //  Menghapus tabel collections jika tabel tersebut ada
        Schema::dropIfExists('books');
    }
}

