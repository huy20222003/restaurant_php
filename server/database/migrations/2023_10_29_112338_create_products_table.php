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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categoryId');
            $table->string('name');
            $table->string('subDescription')->nullable();
            $table->text('description');
            $table->double('price');
            $table->double('priceSale')->nullable();
            $table->string('status');
            $table->string('size')->nullable();
            $table->string('color');
            $table->integer('quantity');
            $table->text('imageUrl');
            $table->double('rate');
            $table->foreign('categoryId')->references('id')->on('categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
