<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            // Relasi ke tabel users otomatis
            $table->foreignId('user_id')->constrained('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('book_id');
            $table->text('comment')->nullable(); // Comment
            $table->integer('rating'); // Rating (1-5)
           
            $table->timestamps();

            // Relasi ke tabel books
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');

        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
