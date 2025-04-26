<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Menyimpan judul buku
            $table->string('author'); // Menyimpan nama penulis
            $table->unsignedBigInteger('collection_id');
            $table->unsignedBigInteger('category_id');
            $table->text('book');
            $table->year('publication_year'); // Menyimpan tahun terbit

            // Relasi ke tabel collections
           
            $table->foreign('collection_id')->references('id')->on('collections')->onDelete('cascade');


            // Relasi ke tabel categories
            
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
