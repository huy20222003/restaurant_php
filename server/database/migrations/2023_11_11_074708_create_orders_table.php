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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('fullName');
            $table->text('shipAddress');
            $table->string('phoneNumber')->max(10);
            $table->double('totalPrices');
            $table->double('shippingFee');
            $table->string('status');
            $table->string('shippingUnit');
            $table->string('paymentMethod');
            $table->unsignedBigInteger('userOrder');
            $table->foreign('userOrder')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
